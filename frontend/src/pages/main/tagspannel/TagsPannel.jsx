import React, { useEffect } from "react";
import { useGetTagsQuery } from '../../../features/tags/tagsApiSlice';
import { useLocation } from "react-router-dom";


function TagsPannel() {
  const {
    data: tagsFromAPI, // rename data to tags
    isLoading,
    refetch
  } = useGetTagsQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  return (isLoading ? <div>Loading...</div> : (
    <div>
      <div>Tags panel</div>
      <div>
        {tagsFromAPI.data.map((tag) => (
          <div key={tag.id}>
            <span>{tag.name}</span>
            <ul>
              {tag.recipes.map((recipe) => (
                <li key={recipe.id}>{recipe.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default TagsPannel;
