import "./InspirationTab.css";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery"; // MediaQuery hook for dynamic rendering
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import { fetchAllRecipesInDBPagination, RecipeItemMongo } from "../api/recipeApi.ts";
import getStringMongoObjectId from "../../utils/getStringMongoObjectId.ts";
import { inspoContainer, modalBoxStyle } from "./muiStyles.ts";
import recipePlaceholder from "../../assets/recipe-placeholder.png";
import { getRandomHeight } from "../recipecreation/utils/util.ts";
import { RecipeItemMongoWithHeight } from "../../utils/Types.ts";
import Button from "@mui/material/Button";
import { inspoModalButton } from "./InspoModalStyles.ts";
import RecipeImage from "../recipetab/RecipeImage.tsx";
import { handleGetPhotoId, handleGetPhotoIdWithoutHeight } from "../../utils/editPhotoUtils.ts";

const InspirationTab = () => {
  //media queries for mobile
  const isMobile = useMediaQuery("(max-width:768px)");
  const [currentRecipe, setCurrentRecipe] = useState<RecipeItemMongo>();
  const [recipeList, setRecipeList] = useState<RecipeItemMongoWithHeight[]>([]);
  //for calling usequery onmount
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setFromInspiration, user } = useAuth();

  const fetchFoodSamples = async () => {
    const response = await fetchAllRecipesInDBPagination(user!, 1, 10);
    return response.data as RecipeItemMongo[];
  };

  const { isLoading, status, data } = useQuery({
    queryKey: ["inspiration"],
    queryFn: fetchFoodSamples,
    enabled: isMounted,
    refetchOnWindowFocus: false,
  });

  //only on mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //updating based on status and data
  useEffect(() => {
    if (status === "success" && data) {
      const recipeWithRandomHeight: RecipeItemMongoWithHeight[] = data.map((recipe) => {
        const formattedRecipe: RecipeItemMongoWithHeight = {
          recipe,
          height: getRandomHeight(),
        };
        return formattedRecipe;
      });
      setRecipeList(recipeWithRandomHeight);
    }
  }, [status, data]);

  function handleOpenModal(mealId: string) {
    const currentRecipe = recipeList.find((recipe) => getStringMongoObjectId(recipe.recipe._id) === mealId);
    setCurrentRecipe(currentRecipe?.recipe);
    setModalOpen(true);
    console.log(currentRecipe);
  }

  return (
    <div>
      {isLoading && (
        <div className="text-center mt-5">
          <CircularProgress size={80} />
        </div>
      )}
      <div className="inspo-container">
        <Box sx={inspoContainer(isMobile)}>
          <ImageList variant="masonry" cols={isMobile ? 2 : 3} gap={10}>
            {recipeList.map((item) => (
              <ImageListItem
                key={getStringMongoObjectId(item.recipe._id)}
                onClick={() => handleOpenModal(getStringMongoObjectId(item.recipe._id))}
              >
                {item.recipe.photo_url.length > 0 ? (
                  <RecipeImage imageId={handleGetPhotoId(item)} height={item.height} />
                ) : (
                  <img
                    src={recipePlaceholder}
                    alt={item.recipe.title}
                    loading="lazy"
                    style={{ height: `${item.height}px`, width: "100%", objectFit: "cover" }}
                  />
                )}
                <div className="overlay-text">
                  <span
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.recipe.title}
                  </span>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
      <div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalBoxStyle(isMobile)}>
            <div>
              <div className="text-center mt-2 meal-name-container">
                <span className="fs-5">{currentRecipe?.title}</span>
                <hr />
              </div>
              <div className="d-flex justify-content-center align-content-center my-4">
                {currentRecipe?.photo_url ? (
                  <RecipeImage imageId={handleGetPhotoIdWithoutHeight(currentRecipe)} />
                ) : (
                  <img
                    src={recipePlaceholder}
                    alt="placeholder recipe image"
                    loading="lazy"
                    width={isMobile ? "90%" : "50%"}
                    className="img-fluid rounded border border-white"
                  />
                )}
              </div>
              <div className="d-flex justify-content-center align-content-center">
                <div className="my-2">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate("/create", {
                        state: { meal: currentRecipe?.title },
                      });
                      setFromInspiration(true);
                    }}
                    sx={inspoModalButton()}
                  >
                    <span className="p-1 button-text-container">Generate Recipe</span>
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default InspirationTab;
