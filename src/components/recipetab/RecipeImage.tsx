import React, { useEffect, useState } from "react";
import { getImageBlobById } from "../api/imageApi.ts";
import { useAuth } from "../../hooks/useAuth.tsx";
import recipePlaceholder from "../../assets/recipe-placeholder.png";

type RecipeImageProps = {
  height?: number;
  imageId: string;
};

const RecipeImage: React.FC<RecipeImageProps> = ({ height, imageId }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleFetchImageUrl = async () => {
      setLoading(true);
      try {
        const blob = await getImageBlobById(user!, imageId);
        const objectUrl = URL.createObjectURL(blob);
        setImgUrl(objectUrl);
      } catch (err) {
        console.error("Error fetching image:", err);
        setImgUrl(recipePlaceholder);
      } finally {
        setLoading(false);
      }
    };

    handleFetchImageUrl();

    // Cleanup function
    return () => {
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
    };
  }, [user, imageId]);

  if (loading) {
    return (
      <div
        style={{ height: `${height}px`, width: "100%", objectFit: "cover" }}
        className="bg-dark d-flex align-items-center justify-content-center"
      >
        <p className="text-warning">Fetching image..</p>
      </div>
    );
  }

  return <img src={imgUrl} alt="food" style={{ height: `${height}px`, width: "100%", objectFit: "cover" }} />;
};

export default RecipeImage;
