import { Create } from "@refinedev/chakra-ui";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { ICategory, IProduct, IRecipe } from "../../interfaces";

export const ProductCreate = () => {
  const {
    refineCore: { formLoading },
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IProduct>();

  const { options: categories } = useSelect<ICategory>({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
  });

  const { options: recipes } = useSelect<IRecipe>({
    resource: "recipes",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <FormControl mb="3" isInvalid={!!errors?.name}>
        <FormLabel>Nama</FormLabel>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "Nama harus diisi" })}
        />
        <FormErrorMessage>{`${errors.title?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.price}>
        <FormLabel>Harga</FormLabel>
        <Input
          id="price"
          type="number"
          {...register("price", {
            required: "Harga harus diisi",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.quantity}>
        <FormLabel>Stok</FormLabel>
        <Input
          id="quantity"
          type="number"
          {...register("quantity", {
            required: "Quantity harus diisi",
            valueAsNumber: true,
          })}
        />
        <FormErrorMessage>{`${errors.status?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Category</FormLabel>
        <Select
          id="categoryId"
          placeholder="Select Category"
          {...register("categoryId", {
            required: "Category is required",
          })}
        >
          {categories?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.categoryId?.message}`}</FormErrorMessage>
      </FormControl>
      <FormControl mb="3" isInvalid={!!errors?.categoryId}>
        <FormLabel>Resep</FormLabel>
        <Select
          id="recipeId"
          placeholder="Select Resep"
          {...register("recipeId", {
            required: "Resep is required",
          })}
        >
          {recipes?.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{`${errors.recipeId?.message}`}</FormErrorMessage>
      </FormControl>
    </Create>
  );
};
