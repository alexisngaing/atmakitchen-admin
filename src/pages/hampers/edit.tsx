import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Edit } from "@refinedev/chakra-ui";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { IHamper, IProduct } from "../../interfaces";

export const HamperEdit = () => {
  const {
    refineCore: { formLoading, queryResult },
    saveButtonProps,
    register,
    formState: { errors },
    resetField,
  } = useForm<IHamper>();

  const { options: products } = useSelect<IProduct>({
    resource: "products",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{ children: "Simpan", ...saveButtonProps }}
      headerButtons={() => undefined}
    >
      <FormControl mb="3" isInvalid={!!errors?.name}>
        <FormLabel>Nama Hamper</FormLabel>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "Nama hamper harus diisi" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.image}>
        <FormLabel>Gambar</FormLabel>
        <Input
          id="image"
          type="text"
          {...register("image", { required: "Gambar harus diisi" })}
        />
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.price}>
        <FormLabel>Harga</FormLabel>
        <Input
          id="price"
          type="number"
          {...register("price", { required: "Harga harus diisi" })}
        />
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.products}>
        <FormLabel>Produk</FormLabel>
        <Select
          id="productId"
          placeholder="Pilih Produk"
          {...register("productId", {
            required: "Produk harus diisi",
          })}
        >
          {products?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
    </Edit>
  );
};
