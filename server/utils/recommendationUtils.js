import cosineSimilarity from './similarityUtils.js';

const calculateSimilarity = (favoriteProductIds, products) => {
    const recommendations = [];

    const productFeatures = products.map(product => ({
        id: product._id,
        features: [product.categoryID, product.price, product.description]
    }));

    productFeatures.forEach(product => {
        if (!favoriteProductIds.includes(product.id)) {
            const similarityScore = favoriteProductIds.reduce((acc, favId) => {
                const favProduct = products.find(p => p._id.equals(favId));
                if (favProduct) {
                    return acc + cosineSimilarity(product.features, [favProduct.categoryID, favProduct.price, favProduct.description]);
                }
                return acc;
            }, 0);

            recommendations.push({ productId: product.id, score: similarityScore });
        }
    });

    recommendations.sort((a, b) => b.score - a.score);
    return recommendations;
};

export default calculateSimilarity;