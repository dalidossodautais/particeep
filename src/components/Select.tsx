import {
  ChangeEventHandler,
  ReactNode,
  SelectHTMLAttributes,
  useCallback,
} from "react";

import styles from "./Select.module.css";

export interface SelectProps<T extends string | number | undefined>
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "options" | "onChange" | "value" | "title"
  > {
  options: (Exclude<T, undefined> | { label: string; value: T })[];
  onChange: (value: T) => void;
  title?: ReactNode;
  value?: T;
}

export const Select = <T extends string | number | undefined>({
  options,
  onChange,
  title,
  value,
  ...props
}: SelectProps<T>) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      onChange(event.target.value as T);
    },
    [onChange]
  );

  return (
    <select
      className={styles.select}
      onChange={handleChange}
      value={value}
      {...props}
    >
      {options.map((option) =>
        typeof option === "string" || typeof option === "number" ? (
          <option key={option} value={option}>
            {option}
          </option>
        ) : (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
      )}
    </select>
  );
};
