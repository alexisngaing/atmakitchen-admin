import {
  AuthProvider,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import {
  AuthPage,
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  useNotificationProvider,
  ThemedSiderV2,
} from "@refinedev/chakra-ui";
import { Center, ChakraProvider, Flex, Text, color } from "@chakra-ui/react";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons-react";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { ProductCreate, ProductEdit, ProductList } from "./pages/products";
import { RecipeList } from "./pages/recipes";
import { IngredientList } from "./pages/ingredients";
import { RecipeIngredientList } from "./pages/recipes-ingredients";
import { HamperList } from "./pages/hampers";
import { EmployeeList } from "./pages/employees";
import { CustodianList } from "./pages/custodians";

/**
 *  mock auth credentials to simulate authentication
 */
const authCredentials = {
  email: "demo@refine.dev",
  password: "demodemo",
};

const App: React.FC = () => {
  const authProvider: AuthProvider = {
    login: async ({ providerName, email }) => {
      if (providerName === "google") {
        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth";
        return {
          success: true,
        };
      }

      if (providerName === "github") {
        window.location.href = "https://github.com/login/oauth/authorize";
        return {
          success: true,
        };
      }

      if (email === authCredentials.email) {
        localStorage.setItem("email", email);
        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    register: async (params) => {
      if (params.email === authCredentials.email && params.password) {
        localStorage.setItem("email", params.email);
        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    },
    updatePassword: async (params) => {
      if (params.password === authCredentials.password) {
        //we can update password here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Update password failed",
          name: "Invalid password",
        },
      };
    },
    forgotPassword: async (params) => {
      if (params.email === authCredentials.email) {
        //we can send email with reset password link here
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: {
          message: "Forgot password failed",
          name: "Invalid email",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem("email");
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return { error };
    },
    check: async () =>
      localStorage.getItem("email")
        ? {
            authenticated: true,
          }
        : {
            authenticated: false,
            error: {
              message: "Check failed",
              name: "Not authenticated",
            },
            logout: true,
            redirectTo: "/login",
          },
    getPermissions: async () => ["admin"],
    getIdentity: async () => ({
      id: 1,
      name: "Jane Doe",
      avatar:
        "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
    }),
  };

  return (
    <BrowserRouter>
      <ChakraProvider theme={RefineThemes.Green}>
        <Refine
          dataProvider={dataProvider("https://api.atmakitchen.ninja/v1")}
          authProvider={authProvider}
          routerProvider={routerProvider}
          notificationProvider={useNotificationProvider()}
          resources={[
            {
              name: "posts",
              list: "/posts",
              edit: "/posts/edit/:id",
              create: "/posts/create",
            },
            {
              name: "products",
              list: "/products",
              edit: "/products/edit/:id",
              create: "/products/create",
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
              name: "recipes_ingredients",
              list: "/products",
              edit: "/recipes_ingredients/edit/:id",
              create: "/recipes_ingredients/create",
            },
            {
              name: "hampers",
              list: "/products",
              edit: "/hampers/edit/:id",
              create: "/hampers/create",
            },
            {
              name: "employees",
              list: "/products",
              edit: "/employees/edit/:id",
              create: "/employees/create",
            },
            {
              name: "custodians",
              list: "/products",
              edit: "/custodians/edit/:id",
              create: "/custodians/create",
            },
            {
              name: "categories",
              list: "/categories",
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
                    Sider={() => (
                      <ThemedSiderV2
                        Title={({ collapsed }) => (
                          <Flex>
                            <Center w="160px">
                              <Text as="b" color="lightgreen" fontSize="xl">
                                Atma Kitchen
                              </Text>
                            </Center>
                          </Flex>
                        )}
                        render={({ items, logout, collapsed }) => {
                          return (
                            <>
                              <div>My Custom Element</div>
                              {items}
                              {logout}
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
              <Route index element={<NavigateToResource resource="posts" />} />

              <Route path="/posts">
                <Route index element={<PostList />} />
                <Route path="create" element={<PostCreate />} />
                <Route path="edit/:id" element={<PostEdit />} />
                <Route path="show/:id" element={<PostShow />} />
              </Route>

              <Route
                index
                element={<NavigateToResource resource="products" />}
              />

              <Route path="/products">
                <Route index element={<ProductList />} />
                <Route path="create" element={<ProductCreate />}></Route>
                <Route path="edit/:id" element={<ProductEdit />} />
                {/* <Route path="show/:id" element={<Show />} /> */}
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
                element={<NavigateToResource resource="recipes_ingredients" />}
              />

              <Route path="/recipes_ingredients">
                <Route index element={<RecipeIngredientList />} />
                <Route path="create" element></Route>
              </Route>

              <Route
                index
                element={<NavigateToResource resource="hampers" />}
              />

              <Route path="/hampers">
                <Route index element={<RecipeList />} />
                <Route path="create" element></Route>
              </Route>

              <Route
                index
                element={<NavigateToResource resource="employees" />}
              />

              <Route path="/employees">
                <Route index element={<RecipeList />} />
                <Route path="create" element></Route>
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
                    formProps={{
                      defaultValues: {
                        ...authCredentials,
                      },
                    }}
                    providers={[
                      {
                        name: "google",
                        label: "Sign in with Google",
                        icon: <IconBrandGoogle />,
                      },
                      {
                        name: "github",
                        label: "Sign in with GitHub",
                        icon: <IconBrandGithub />,
                      },
                    ]}
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <AuthPage
                    type="register"
                    providers={[
                      {
                        name: "google",
                        label: "Sign in with Google",
                        icon: <IconBrandGoogle />,
                      },
                      {
                        name: "github",
                        label: "Sign in with GitHub",
                        icon: <IconBrandGithub />,
                      },
                    ]}
                  />
                }
              />
              <Route
                path="/forgot-password"
                element={<AuthPage type="forgotPassword" />}
              />
              <Route
                path="/update-password"
                element={<AuthPage type="updatePassword" />}
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
