import Loader from "./../components/Loader";

export default {
    title: "Loader",
    component:Loader
}

export const Error = () => <Loader isLoading={false} isError={true} />

export const Loading = () => <Loader isLoading={true} isError={false} />;
