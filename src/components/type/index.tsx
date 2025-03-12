import { useEffect, useState } from 'react';
import { combination, variantType } from '../../data/data';
import { cartesianProduct } from '../../utils/utils.fns';
import { CombinationModel, VariantModel } from '../../model/model';
import { CartesianCombinations } from '../combinations';

export const CombinationType: React.FunctionComponent = () => {
  const [type, setType] = useState<VariantModel>(variantType);
  const [combinations, setCombinations] =
    useState<CombinationModel>(combination);

  useEffect(() => {
    generateCombinations();
  }, [type]);

  const generateCombinations = () => {
    const options = type.map((type) => type.options.map((_, index) => index));
    const variantCombinations = cartesianProduct(options);
    const newCombinations = variantCombinations?.map((combination) => {
      const combinationKey = combination.join('-');
      return {
        value: '',
        combinationKey,
      };
    });
    setCombinations(newCombinations);
  };

  const handleOptionValue = (
    newValue: string,
    type_index: number,
    opt_index: number
  ) => {
    const updatedType = [...type];
    updatedType[type_index].options[opt_index].value = newValue;
    setType(updatedType);
  };
  return (
    <>
      <div>
        <button onClick={() => console.log(combinations, 'combination')}>
          CLick
        </button>
        {type?.map((item, type_index) => (
          <div key={type_index}>
            <div>Type</div>
            <input type="text" />
            <button
              onClick={() => {
                const updatedType = [...type];
                updatedType.push({
                  options: [
                    {
                      value: '',
                    },
                  ],
                });
                setType(updatedType);
              }}
            >
              Add
            </button>
            <button
              onClick={() => {
                const updatedType = type.filter(
                  (_, index) => type_index !== index
                );
                setType(updatedType);
              }}
            >
              Delete
            </button>
            <div>
              <div>Options</div>
              {item.options.map((option, opt_index) => (
                <>
                  <input
                    onChange={(e) => {
                      handleOptionValue(e.target.value, type_index, opt_index);
                    }}
                    value={option.value}
                    key={opt_index}
                    type="text"
                  />
                  <button
                    onClick={() => {
                      const updatedType = [...type];
                      updatedType[type_index].options.push({ value: '' });
                      setType(updatedType);
                    }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      const updatedTypes = [...type];
                      const variantType = updatedTypes[type_index];
                      const updatedOptions = variantType.options.filter(
                        (_, idx) => idx !== opt_index
                      );
                      updatedTypes[type_index] = {
                        ...variantType,
                        options: updatedOptions,
                      };
                      setType(updatedTypes);
                    }}
                  >
                    Delete
                  </button>
                </>
              ))}
            </div>
            <hr />
          </div>
        ))}
      </div>
      <CartesianCombinations combinations={combinations} type={type} />
    </>
  );
};
