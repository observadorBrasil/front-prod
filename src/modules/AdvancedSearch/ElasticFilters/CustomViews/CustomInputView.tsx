import React from "react";
import theme from "../../../../../src/theme";
import { InputViewProps } from "@elastic/react-search-ui-views";

export const CustomInputView = ({
  getAutocomplete,
  getInputProps,
  getButtonProps,
}: InputViewProps) => {
  return (
    <>
      <div className="sui-search-box__wrapper">
        <input
          {...getInputProps({
            placeholder: "Pesquise por palavra chave...",
          })}
        />
        {getAutocomplete()}
      </div>
      <input
        {...getButtonProps({
          value: "Pesquisar",
        })}
        style={{ background: theme.colors.primary }}
      />
    </>
  );
};
