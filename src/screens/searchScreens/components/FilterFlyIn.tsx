import React, { useState, lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Close from "../../../assets/icons/close.svg";
import CustomButton from "../../../components/Button/Button";
import FilterTabs from "./FilterTabs";
const DateRangeTab = lazy(() => import("./DateRangeTab"));
const CategoryTab = lazy(() => import("./CategoryTab"));
const RatingTab = lazy(() => import("./RatingTab"));
import { CATEGORIES, MONTHS, RATINGS } from "../../../constants/constants";
import {
  resetSearch,
  setCtgs,
  setRtgs,
  setFilterTags,
  setDateRange,
} from "../../../redux/slices/searchSlice";
import { resetDate } from "../../../redux/slices/homeSlice";
const tabs = ["Date Range", "Category", "Rating"];

const FilterFlyIn = ({ onClose = () => {}, closeOnly = () => {} }) => {
  const dispatch = useDispatch();

  const { selectedCtgs, selectedRtgs, dateRange } = useSelector(
    (state) => state.search
  );
  const { startDate, endDate } = useSelector((state) => state.home);
  const { year: sy, month: sm, date: sd } = startDate;
  const { year: ey, month: em, date: ed } = endDate;

  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState("Date Range");
  const [selectedCategories, setSelectedCategories] = useState(selectedCtgs);
  const [selectedRatings, setSelectedRatings] = useState(selectedRtgs);

  const handleApplyFilters = () => {
    const ctgTags = selectedCategories.map((t) => ({
      type: "category",
      id: t.id,
      name: t.name,
    }));
    const rtgTags = selectedRatings.map((t) => ({
      type: "rating",
      id: t.id,
      name: t.name,
    }));
    const dateTag = {
      type: "date",
      id: null,
      name: `${MONTHS[sm]?.short} ${sd}, ${sy} - ${MONTHS[em]?.short} ${ed}, ${ey}`,
    };

    let allTags = [];
    allTags.push(dateTag);
    allTags = [...allTags, ...ctgTags, ...rtgTags];
    dispatch(setFilterTags(allTags));
    dispatch(setDateRange(`${sy}-${sm}-${sd}/${ey}-${em}-${ed}`));
    dispatch(setCtgs(selectedCategories));
    dispatch(setRtgs(selectedRatings));
    onClose();
  };

  const handleClearFilters = () => {
    dispatch(resetSearch());
    dispatch(resetDate());
    onClose();
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isReady) {
        setIsReady(true);
      }
    }, 10);
  }, []);

  return (
    <View style={styles.flyInContainer}>
      {/* Header Title */}
      <View style={styles.headerContainer}>
        <View style={styles.flex}>
          <Text style={styles.title}>Filter & Search</Text>
          <TouchableOpacity
            style={{ padding: 5, paddingLeft: 0 }}
            onPress={onClose}
          >
            <Close />
          </TouchableOpacity>
        </View>
      </View>
      {!isReady && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {isReady && (
        <View style={{ flex: 1 }}>
          {/* Tabs and Tab content */}
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              {/* Tabs(left panel) */}
              <View style={styles.tabs}>
                <FilterTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setActiveTab={(tab) => setActiveTab(tab)}
                />
              </View>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Tab Content(right panel) */}
              <View style={styles.content}>
                <Suspense fallback={<ActivityIndicator />}>
                  {activeTab === "Date Range" && (
                    <DateRangeTab startDate={startDate} endDate={endDate} />
                  )}
                  {activeTab === "Category" && (
                    <CategoryTab
                      categories={CATEGORIES}
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                    />
                  )}
                  {activeTab === "Rating" && (
                    <RatingTab
                      ratings={RATINGS}
                      selectedRatings={selectedRatings}
                      setSelectedRatings={setSelectedRatings}
                    />
                  )}
                </Suspense>
              </View>
            </View>
          </View>

          {/* Continue and clear buttons */}
          <View style={{ marginTop: 20 }}>
            <CustomButton
              isLoading={false}
              disabled={false}
              onPress={handleApplyFilters}
              title="Apply Filters"
              buttonStyle={{ paddingVertical: 8 }}
            />
            <CustomButton
              title="Clear Filters"
              onPress={handleClearFilters}
              buttonStyle={{
                paddingVertical: 8,
                backgroundColor: "transparent",
              }}
              containerStyle={{ marginTop: 12 }}
              textStyle={{ color: "#FFFFFF" }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterFlyIn;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
    height: "97%",
    paddingBottom: 20,
    backgroundColor: "rgba(14, 14, 14, 0.95)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  flyInContainer: {
    position: "absolute",
    paddingHorizontal: 16,
    width: "100%",
    height: "97%",
    paddingBottom: 20,
    backgroundColor: "rgba(14, 14, 14, 0.95)",
    borderWidth: 0.7,
    borderColor: "#333333",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
  },
  headerContainer: {
    width: "100%",
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 12,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
  },
  body: {
    borderBottomColor: "#3B3B3B",
    borderBottomWidth: 1,
    flex: 1,
  },
  bodyContent: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  tabs: {
    flex: 0.3,
  },
  divider: {
    height: "100%",
    marginHorizontal: 16,
    borderColor: "#3B3B3B",
    borderLeftWidth: 1,
  },
  content: {
    flex: 0.7,
    paddingVertical: 16,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
