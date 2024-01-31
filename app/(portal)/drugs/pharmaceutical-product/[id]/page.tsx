import useSWR from "swr";
import PharmaceuticalProductForm from "../pharmaceuticalProductForm";
import Loading from "@/app/(components)/Loading";

const EditPharmaceuticalProduct = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const { data: pharmaceuticalProduct } = useSWR(
    id ? `/drugPharmaceuticalProducts/${id}` : null
  );

  if (!pharmaceuticalProduct) return <Loading />;
  return (
    <PharmaceuticalProductForm
      textName="Editar"
      pharmaceuticalProduct={pharmaceuticalProduct}
    />
  );
};

export default EditPharmaceuticalProduct;
