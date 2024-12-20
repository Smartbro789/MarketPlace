function contentBasedFiltering(targetProduct, products) {
    const targetText =
        targetProduct.description + ' ' + targetProduct.tags + ' ' + targetProduct.category;

    return products
        .filter((p) => p._id.toString() !== targetProduct._id.toString()) // Виключаємо сам товар
        .map((p) => {
            const text = p.description + ' ' + p.tags + ' ' + p.category;
            const similarity = calculateCosineSimilarity(targetText, text);
            return { product: p, similarity };
        })
        .sort((a, b) => b.similarity - a.similarity) // Сортуємо за схожістю
        .slice(0, 5);
}

function calculateCosineSimilarity(text1, text2) {
    const words1 = text1.toLowerCase().split(/\W+/);
    const words2 = text2.toLowerCase().split(/\W+/);

    const allWords = [...new Set([...words1, ...words2])];

    const vector1 = allWords.map((word) => words1.filter((w) => w === word).length);
    const vector2 = allWords.map((word) => words2.filter((w) => w === word).length);

    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val ** 2, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val ** 2, 0));

    return dotProduct / (magnitude1 * magnitude2);
}
module.exports = contentBasedFiltering;