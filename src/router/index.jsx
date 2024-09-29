import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from '../App.jsx';
import {
    SignIn, SignUp,
    AdminPanel,
    Categories,
    Products,
    SubCategories,
    Brands,
    Settings,
    Stock,
    Ads,
    BrandCategory,
} from '@pages';

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route path="/" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />

                <Route path="admin-panel" element={<AdminPanel />}>
                    <Route index element={<Products />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/:id" element={<SubCategories />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="brand-category" element={<BrandCategory />} />
                    <Route path="ads" element={<Ads />} />
                    <Route path="stock" element={<Stock/>} />
                    <Route path="settings" element={<Settings />} />

                </Route>
            </Route>
        )
    )
    return <RouterProvider router={router} />;
}
export default Index;