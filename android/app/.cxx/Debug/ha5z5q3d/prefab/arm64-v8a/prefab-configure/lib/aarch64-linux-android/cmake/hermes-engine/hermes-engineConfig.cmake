if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/pritam/.gradle/caches/transforms-3/326082d7824444f44dd7ddc73ac7cb9a/transformed/jetified-hermes-android-0.71.7-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/pritam/.gradle/caches/transforms-3/326082d7824444f44dd7ddc73ac7cb9a/transformed/jetified-hermes-android-0.71.7-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

