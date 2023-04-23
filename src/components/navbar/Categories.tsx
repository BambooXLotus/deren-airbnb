import { usePathname, useSearchParams } from "next/navigation";
import { CategoryBox } from "../CategoryBox";
import { Container } from "../Container";
import { categoriesList } from "./CategoriesList";

type CategoriesProps = {
  id?: string;
};

export const Categories: React.FC<CategoriesProps> = () => {
  const currentCategoriesList = categoriesList;

  const params = useSearchParams();
  const currentCategory = params?.get("category");
  const pathname = usePathname();

  const isMainpage = pathname === "/";

  if (!isMainpage) return null;

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {currentCategoriesList.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={currentCategory === category.label}
          />
        ))}
      </div>
    </Container>
  );
};
