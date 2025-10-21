import * as tf from '@tensorflow/tfjs';

// Load MobileNet model for feature extraction
let model: tf.LayersModel | null = null;

export const loadModel = async (): Promise<void> => {
  if (!model) {
    model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/mobilenet_v2_100_224/feature_vector/3/default/1');
  }
};

export const extractFeatures = async (imageElement: HTMLImageElement): Promise<number[]> => {
  if (!model) {
    await loadModel();
  }

  // Preprocess image
  const tensor = tf.browser.fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .expandDims(0)
    .div(255.0);

  // Extract features
  const features = model!.predict(tensor) as tf.Tensor;
  const featuresArray = await features.data();
  
  // Clean up tensors
  tensor.dispose();
  features.dispose();
  
  return Array.from(featuresArray);
};

export const calculateSimilarity = (features1: number[], features2: number[]): number => {
  if (features1.length !== features2.length) {
    return 0;
  }

  // Calculate cosine similarity
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < features1.length; i++) {
    dotProduct += features1[i] * features2[i];
    norm1 += features1[i] * features1[i];
    norm2 += features2[i] * features2[i];
  }

  if (norm1 === 0 || norm2 === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
};

export const findMatches = async (
  targetFeatures: number[],
  candidateBikes: Array<{ id: string; imageFeatures?: number[]; bike: any }>,
  threshold: number = 0.6
): Promise<Array<{ bikeId: string; similarity: number; bike: any }>> => {
  const matches: Array<{ bikeId: string; similarity: number; bike: any }> = [];

  for (const candidate of candidateBikes) {
    if (candidate.imageFeatures && candidate.imageFeatures.length > 0) {
      const similarity = calculateSimilarity(targetFeatures, candidate.imageFeatures);
      
      if (similarity >= threshold) {
        matches.push({
          bikeId: candidate.id,
          similarity: Math.round(similarity * 100),
          bike: candidate.bike
        });
      }
    }
  }

  // Sort by similarity (highest first)
  return matches.sort((a, b) => b.similarity - a.similarity);
};

export const preprocessImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const extractFeaturesFromFile = async (file: File): Promise<number[]> => {
  const imageElement = await preprocessImage(file);
  return await extractFeatures(imageElement);
};
