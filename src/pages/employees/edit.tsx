import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Edit } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";

import { IEmployee } from "../../interfaces";

export const EmployeeEdit = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IEmployee>();

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{ children: "Simpan", ...saveButtonProps }}
      headerButtons={() => undefined}
    >
      <FormControl mb="3" isInvalid={!!errors?.fullName}>
        <FormLabel>Nama Lengkap</FormLabel>
        <Input
          id="fullName"
          type="text"
          {...register("fullName", { required: "Nama harus diisi" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.email}>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email harus diisi",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        <FormErrorMessage>{`${errors.email?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.dob}>
        <FormLabel>Tanggal Lahir</FormLabel>
        <Input
          id="dob"
          type="date"
          {...register("dob", { required: "Tanggal lahir harus diisi" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
