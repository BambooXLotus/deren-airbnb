import Select from "react-select";
import useCountries from "~/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
};

type CountryOptionLabelProps = {
  option: CountrySelectValue;
};

const CountryOptionLabel: React.FC<CountryOptionLabelProps> = ({ option }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div>{option.flag}</div>
      <div>
        {option.label},{" "}
        <span className="ml-1 text-neutral-500">{option.region}</span>
      </div>
    </div>
  );
};

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
}) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => void onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => <CountryOptionLabel option={option} />}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};
