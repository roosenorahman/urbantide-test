
// Calculate the mean (average) of an array of numbrrs.
const calculateMean = (values) => {
  const sum = values.reduce((a, b) => a + b, 0)
  return sum / values.length
}

// Calculate the standard deviation of an array of numbers.
const calculateStandardDeviation = (values, mean) => {
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
  return Math.sqrt(variance)
}

// Calculate the z-scores of an array of numbers.
const calculateZScores = (values, mean, stdDev) => {
  return values.map(value => (value - mean) / stdDev)
}

// Detect outliers in a dataset based on z-scores.
const detectOutliers = (data) => {
  const threshold = parseFloat(process.env.Z_SCORE_THRESHOLD)
  const values = data.map(row => parseFloat(row.value))

  const mean = calculateMean(values)
  const stdDev = calculateStandardDeviation(values, mean)
  const zScores = calculateZScores(values, mean, stdDev)

  const outliers = data.map((value, index) => {
    const zScore = zScores[index]
    return {
      index,
      value,
      zScore,
      isOutlier: Math.abs(zScore) > threshold
    };
  }).filter(entry => entry.isOutlier)

  return outliers
}

module.exports = {
  calculateMean,
  calculateStandardDeviation,
  calculateZScores,
  detectOutliers
}