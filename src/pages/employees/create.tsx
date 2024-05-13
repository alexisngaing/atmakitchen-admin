import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Create } from "@refinedev/chakra-ui";
import { useForm } from "@refinedev/react-hook-form";

import { IEmployee } from "../../interfaces";

export const EmployeeCreate = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IEmployee>();

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{ children: "Simpan", ...saveButtonProps }}
      title={"Tambah Karyawan"}
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
    </Create>
  );
};
