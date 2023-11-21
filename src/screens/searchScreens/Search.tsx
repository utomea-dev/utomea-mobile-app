import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import { formatDate } from "../../utils/helpers";
import { useFocusEffect } from "@react-navigation/native";
import GeneralHeader from "../../components/Header/GeneralHeader";
import CustomInput from "../../components/Input/Input";

import FilterIcon from "../../assets/icons/filter.svg";
import CloseIcon from "../../assets/icons/close_medium.svg";
import SearchIcon from "../../assets/icons/search.svg";

import FilterFlyIn from "./components/FilterFlyIn";
import FilteredEvents from "./components/FilteredEvents";
import {
  autoSuggest,
  clearData,
  clearSuggestions,
  removeFilterTag,
  resetSearch,
  searchEvents,
  setCtgs,
  setDateRange,
  setRtgs,
  setSearchString,
} from "../../redux/slices/searchSlice";
import FilterChips from "./components/FilterChips";
import Suggestions from "./components/Suggestions";
import { resetExcludeLoaders } from "../../redux/slices/excludeLocationSlice";

const Search = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    data,
    searchEventsLoading,
    autoSuggestLoading,
    searchString,
    selectedCtgs,
    selectedRtgs,
    dateRange,
    filterTags,
    suggestions,
  } = useSelector((state) => state.search);

  const [isFlyInVisible, setIsFlyInVisible] = useState(false);
  const [showFilterIcon, setShowFilterIcon] = useState(true);
  const [search, setSearch] = useState("");

  let debounceTimer;
  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  };

  const hideFlyIn = () => {
    setIsFlyInVisible(false);
  };

  const showFlyIn = () => {
    setIsFlyInVisible(true);
  };

  const onRemove = (chip) => {
    dispatch(removeFilterTag(chip));
    if (chip.type === "date") {
      dispatch(setDateRange(""));
    } else if (chip.type === "category") {
      const newCtgs = selectedCtgs.filter((t) => t.id !== chip.id);
      dispatch(setCtgs(newCtgs));
    } else if (chip.type === "rating") {
      const newRtgs = selectedRtgs.filter((t) => t.id !== chip.id);
      dispatch(setRtgs(newRtgs));
    }
  };

  const fetchMore = () => {};

  const renderSearchFlyIn = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFlyInVisible}
        onRequestClose={hideFlyIn}
      >
        <FilterFlyIn onClose={hideFlyIn} />
      </Modal>
    );
  };

  const renderText = () => {
    if (data && data.length === 0) {
      return (
        <Text style={{ color: "#FFFFFF" }}>
          Sorry, no Events found for{" "}
          {searchString ? `'${searchString}'` : "set filters"}
        </Text>
      );
    } else if (data && data.length > 0) {
      return (
        <Text style={{ color: "#FFFFFF" }}>
          Showing {data.length} {`Event${data.length > 1 ? "s" : ""}`} for{" "}
          {searchString ? `'${searchString}'` : "set filters"}
        </Text>
      );
    }
  };

  useEffect(() => {
    dispatch(resetExcludeLoaders());
  }, []);

  useEffect(() => {
    debounce(() => {
      if (search.length < 3) {
        dispatch(clearSuggestions());
        return;
      }
      dispatch(autoSuggest({ search }));
    }, 1000);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search]);

  useEffect(() => {
    if (
      searchString ||
      selectedCtgs.length > 0 ||
      selectedRtgs.length > 0 ||
      dateRange
    ) {
      dispatch(
        searchEvents({
          search: searchString,
          rating: selectedRtgs.map((r) => r.id),
          category: selectedCtgs.map((c) => c.id),
          start_date: dateRange.length > 0 ? dateRange.split("/")[0] : "",
          end_date: dateRange.length > 0 ? dateRange.split("/")[1] : "",
        })
      );
    } else {
      dispatch(clearData());
    }
  }, [searchString, selectedCtgs, selectedRtgs, dateRange]);

  return (
    <View style={styles.container}>
      {renderSearchFlyIn()}
      <GeneralHeader title="Search" />

      <View style={styles.searchContainer}>
        {!search ? (
          <TouchableOpacity style={styles.searchIcon}>
            <SearchIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              dispatch(clearSuggestions());
              dispatch(setSearchString(""));
              dispatch(clearData());
            }}
            style={styles.searchIcon}
          >
            <CloseIcon />
          </TouchableOpacity>
        )}
        <CustomInput
          onFocus={() => setShowFilterIcon(false)}
          onBlur={() => setShowFilterIcon(true)}
          customPlaceholder="Search for Tags, Title or Location"
          placeholderTextColor="grey"
          containerStyle={{ flex: 1 }}
          placeholderStyle={{ left: 42, width: "80%" }}
          inputStyle={{ paddingLeft: 42 }}
          value={searchString || search}
          onChangeText={(text) => {
            setSearch(text);
            dispatch(setSearchString(""));
          }}
        />
        {suggestions !== null && (
          <View
            style={{
              zIndex: 9999,
              position: "absolute",
              top: 46,
              width: "100%",
            }}
          >
            <Suggestions
              suggestions={suggestions}
              loading={autoSuggestLoading}
            />
          </View>
        )}
        {showFilterIcon && (
          <TouchableOpacity onPress={showFlyIn} style={styles.filterIcon}>
            <FilterIcon />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!!(filterTags.length > 0) && (
          <View>
            <FilterChips onRemove={onRemove} tags={filterTags} />
          </View>
        )}

        <View>
          <View style={{ marginBottom: 16 }}>{renderText()}</View>
          <FilteredEvents />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  searchContainer: {
    marginVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 999,
  },
  suggestionsContainer: {
    flex: 1,
  },
  searchIcon: {
    padding: 14,
    zIndex: 9,
    position: "absolute",
    left: 0,
  },
  filterIcon: {
    paddingLeft: 16,
    paddingVertical: 10,
    paddingRight: 0,
  },
  rowFlex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
    gap: 6,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  tabButton: {
    backgroundColor: "#222222",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#3B3B3B",
    borderRadius: 100,
  },
});

export default Search;
