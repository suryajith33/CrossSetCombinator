import { CombinationModel, VariantModel } from '../../model/model';

type CartesianCOmbinationProps = {
  combinations: CombinationModel;
  type: VariantModel;
};

export const CartesianCombinations: React.FunctionComponent<
  CartesianCOmbinationProps
> = ({ combinations, type }) => {
  return (
    <>
      {combinations?.map((item, index) => {
        const combinationKey = item.combinationKey;

        const indices = combinationKey.split('-').map(Number);
        console.log(indices, 'indices');
        const variantValues = indices.map(
          (index, typeIndex) => type[typeIndex]?.options[index - 1]?.value
        );
        console.log(variantValues, 'variant values');
        const title =
          type?.length > 1 ? variantValues.join('-') : variantValues.join('');
        return (
          <div key={index}>
            <div>{title}</div>
            <input />
            <button>Delete</button>
          </div>
        );
      })}
    </>
  );
};
