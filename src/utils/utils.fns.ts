export const cartesianProduct = (options: number[][]): number[][] => {
	if (!options || options.length === 0) return [];
	const [first, ...rest] = options;
	const remainingProduct = cartesianProduct(rest);
	return first.flatMap((_, index: number) =>
		remainingProduct.length > 0
			? remainingProduct.map((combination: number[]) => [index + 1, ...combination])
			: [[index + 1]]
	);
};
