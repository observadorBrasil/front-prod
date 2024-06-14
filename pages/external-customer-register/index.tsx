/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import PageWrapper from "@observatorio-brasil/atores/src/components/PageWrapper";
import { useForm } from "react-hook-form";
import Form from "@observatorio-brasil/atores/src/components/RHF/Form";
import TextInput from "@observatorio-brasil/atores/src/components/RHF/TextInput";
import Button from "@observatorio-brasil/atores/src/components/Button";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@observatorio-brasil/atores/src/store/hooks";
import {
  FormsActions,
  selectClientRegistrationForm,
} from "@observatorio-brasil/atores/src/store/slices/forms";
import FileUploader from "@observatorio-brasil/atores/src/components/RHF/FileUploader";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { createClient } from "@observatorio-brasil/atores/src/api/services/clients";
import { useRouter } from "next/router";
import styles from "./external-customer-register.module.css";
import Image from "next/image";
import NewLogo from "../../public/images/newlogo-removebg-preview.png";
import ExternalRegisterForm from "../../src/modules/ExternalRegisterForm/ExternalRegisterForm";

// cleid:C= New-Way-Cadastrar-Cliente-Externo

export interface RegisterClientFormValues {
  name: string;
  nickName: string;
  contractStartDate: Date | string;
  businessIcon: FileList;
}

export default function RegisterNewExternalClientPage() {
  const router = useRouter();
  const { handleSubmit, register, watch } = useForm<RegisterClientFormValues>();
  const dispatch = useDispatch();
  const clientRegistrationFormState = useAppSelector(
    selectClientRegistrationForm
  );

  const businessIcon = watch("businessIcon");

  const handleFormSubmit = async (values: RegisterClientFormValues) => {
    const { businessIcon } = values;
    if (businessIcon.length <= 0) {
      toast("Faça o upload de um arquivo", { type: "error" });
      return;
    }

    if (!clientRegistrationFormState.loading) {
      dispatch(FormsActions.requestClientRegistrationFormSubmit());

      const formData = new FormData();
      formData.append("file", businessIcon[0]);
      formData.append("name", values.name);
      formData.append("nickName", values.nickName);
      formData.append(
        "contractStartDate",
        dayjs(values.contractStartDate).startOf("day").toJSON()
      );

      const res = await createClient(formData);

      if (res.data) {
        dispatch(FormsActions.clientRegistrationFormSubmitSuccessful());
        router.push(`/clientes/${res.data.id}/pastas`);
      } else {
        dispatch(FormsActions.clientRegistrationFormSubmitFailed());
      }
    }
  };
  return (
    <PageWrapper
      containerProps={{
        pl: 0,
        pr: 0,
        pt: 0,
        h: "100vh",
      }}
    >
      <div className="w-full h-screen flex">
        <ExternalRegisterForm />
        <div
          className={`${styles.styleExternalCustomerBgImageArea} hidden md:w-1/2 md:flex items-center justify-center w-full`}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <Image
              src={NewLogo}
              alt="logo observatório brasil"
              className="min-w-[380px] w-[36%] mb-40 hidden md:block lg:block"
            />
            <span className="text-white text-lg absolute hidden md:bottom-2 md:block ">
              © Todos os direitos reservados
            </span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
