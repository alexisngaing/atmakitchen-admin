import { ChakraProvider, Flex, Text } from "@chakra-ui/react";
import {
  AuthPage,
  ErrorComponent,
  RefineThemes,
  ThemedHeaderV2,
  ThemedLayoutV2,
  ThemedSiderV2,
} from "@refinedev/chakra-ui";
import { Authenticated, Refine } from "@refinedev/core";
import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { PackageSearchIcon, PersonStandingIcon } from "lucide-react";
import { EmployeeCreate, EmployeeEdit, EmployeeList } from "./pages/employees";
import { HamperCreate, HamperList } from "./pages/hampers";
import { IngredientList } from "./pages/ingredients";
import { ProductCreate, ProductEdit, ProductList } from "./pages/products";
import { RecipeList } from "./pages/recipes";
import { authProvider } from "./providers/auth-provider";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={RefineThemes.Green}>
        <Refine
          dataProvider={dataProvider("https://api.atmakitchen.ninja/v1")}
          authProvider={authProvider}
          routerProvider={routerProvider}
          // Disabled for now
          // notificationProvider={useNotificationProvider()}
          resources={[
            {
              name: "products",
              list: "/products",
              edit: "/products/edit/:id",
              create: "/products/create",
              identifier: "produk",
              meta: {
                label: "Produk",
                icon: <PackageSearchIcon size={24} />,
              },
            },
            {
              name: "recipes",
              list: "/recipes",
              edit: "/recipes/edit/:id",
              create: "/recipes/create",
            },
            {
              name: "ingredients",
              list: "/ingredients",
              edit: "/ingredients/edit/:id",
              create: "/ingredients/create",
            },
            {
              name: "hampers",
              list: "/hampers",
              edit: "/hampers/edit/:id",
              create: "/hampers/create",
            },
            {
              name: "employees",
              list: "/employees",
              edit: "/employees/edit/:id",
              create: "/employees/create",
              identifier: "karyawan",
              meta: {
                label: "Karyawan",
                icon: <PersonStandingIcon size={24} />,
              },
            },
            {
              name: "custodians",
              list: "/products",
              edit: "/custodians/edit/:id",
              create: "/custodians/create",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-routes"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutV2
                    Header={() => <ThemedHeaderV2 />}
                    Title={() => "Atma Kitchen"}
                    Sider={() => (
                      <ThemedSiderV2
                        Title={({ collapsed }) => (
                          <Flex w="100%" justifyContent="center">
                            <Text as="b" color="lightgreen" fontSize="xl">
                              {collapsed ? "AK" : "Atma Kitchen"}
                            </Text>
                          </Flex>
                        )}
                        render={({ items, logout, collapsed }) => {
                          return (
                            <>
                              <Flex flexDirection="column">
                                {items}
                                {logout}
                              </Flex>
                            </>
                          );
                        }}
                      />
                    )}
                  >
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="products" />}
              />

              <Route path="/products">
                <Route index element={<ProductList />} />
                <Route path="create" element={<ProductCreate />} />
                <Route path="edit/:id" element={<ProductEdit />} />
              </Route>

              <Route
                index
                element={<NavigateToResource resource="recipes" />}
              />

              <Route path="/recipes">
                <Route index element={<RecipeList />} />
                <Route path="create" element></Route>
              </Route>

              <Route
                index
                element={<NavigateToResource resource="ingredients" />}
              />

              <Route path="/ingredients">
                <Route index element={<IngredientList />} />
                <Route path="create" element></Route>
              </Route>

              <Route
                index
                element={<NavigateToResource resource="hampers" />}
              />

              <Route path="/hampers">
                <Route index element={<HamperList />} />
                <Route path="create" element={<HamperCreate />} />
              </Route>

              <Route
                index
                element={<NavigateToResource resource="employees" />}
              />

              <Route path="/employees">
                <Route index element={<EmployeeList />} />
                <Route path="create" element={<EmployeeCreate />}></Route>
                <Route path="edit/:id" element={<EmployeeEdit />} />
              </Route>
            </Route>

            <Route
              element={
                <Authenticated key="auth-pages" fallback={<Outlet />}>
                  <NavigateToResource resource="posts" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    rememberMe={false}
                    registerLink={false}
                    forgotPasswordLink={false}
                  />
                }
              />
            </Route>

            <Route
              element={
                <Authenticated key="catch-all">
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
