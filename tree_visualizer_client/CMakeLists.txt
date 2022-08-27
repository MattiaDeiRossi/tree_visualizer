cmake_minimum_required(VERSION 3.0)

project(tree_visualizer_client)

add_executable(example
        src/main.cpp)
target_include_directories(example PUBLIC ${CMAKE_SOURCE_DIR}/include)
set_property(TARGET example PROPERTY CXX_STANDARD 17)