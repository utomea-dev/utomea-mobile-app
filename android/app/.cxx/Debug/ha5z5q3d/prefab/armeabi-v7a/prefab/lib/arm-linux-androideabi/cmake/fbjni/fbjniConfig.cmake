if(NOT TARGET fbjni::fbjni)
add_library(fbjni::fbjni SHARED IMPORTED)
set_target_properties(fbjni::fbjni PROPERTIES
    IMPORTED_LOCATION "/home/pritam/.gradle/caches/transforms-3/73021c6f57a4960753a95b16f8c713d4/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/libs/android.armeabi-v7a/libfbjni.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/pritam/.gradle/caches/transforms-3/73021c6f57a4960753a95b16f8c713d4/transformed/jetified-fbjni-0.3.0/prefab/modules/fbjni/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

