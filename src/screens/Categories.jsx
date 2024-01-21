import { StyleSheet, FlatList } from "react-native";
import GenderBook from "../components/GenderBook.jsx";
import { useSelector } from "react-redux";
import { useGetGendersQuery } from "../services/shopServices.js";

const Categories = ({ navigation }) => {
  const { data, isLoading, error } = useGetGendersQuery();

  const renderCategoryItem = ({ item }) => {
    return <GenderBook gender={item} navigation={navigation}></GenderBook>;
  };

  return (
    <>
      <FlatList
        style={styles.flatCategories}
        data={data}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
      />
    </>
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatCategories: {
    marginBottom: 95,
  },
});
