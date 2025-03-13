import { CombinationModel, VariantModel } from "../../model/model";

type CartesianCOmbinationProps = {
	combinations: CombinationModel;
	type: VariantModel;
};

export const CartesianCombinations: React.FunctionComponent<CartesianCOmbinationProps> = ({ combinations, type }) => {
	return (
		<>
			{combinations?.map((item, index) => {
				const combinationKey = item.combinationKey;
				const indices = combinationKey.split("-").map(Number);
				const variantValues = indices.map((index, typeIndex) => type[typeIndex]?.options[index - 1]?.value);
				const title = type?.length > 1 ? variantValues.join("-") : variantValues.join("");
				return (
					<div className="combination-container">
						<div key={index}>
							<div>{title}</div>
							<input placeholder={title} />
							<button>Delete</button>
						</div>
					</div>
				);
			})}
		</>
	);
};
