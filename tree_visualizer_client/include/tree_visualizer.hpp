//
// Created by matty on 27/08/2022.
//

#ifndef TREE_VISUALIZER_CLIENT_TREE_VISUALIZER_HPP
#define TREE_VISUALIZER_CLIENT_TREE_VISUALIZER_HPP

#include "json.hpp"
#include "HTTPRequest.hpp"
#include <iostream>

namespace tree_visualizer
{
    void visualize() {
        using json = nlohmann::json;

        try {
            http::Request request{"http://127.0.0.1:3000/sendGraph"};
            json body;
            body.push_back(1);
            body.push_back(2);
            body.push_back(3);
            /*body["value"] = 1;
            body["left"]["value"] = 2;
            body["left"]["left"] = nullptr;
            body["left"]["right"] = nullptr;
            body["right"]["value"] = 3;
            body["right"]["left"] = nullptr;
            body["right"]["right"] = nullptr;*/


            const auto response = request.send("POST", body.dump(), {
                    {"Content-Type", "application/json"}
            });
            std::cout << std::string{response.body.begin(), response.body.end()} << '\n'; // print the result
        }
        catch (const std::exception &e) {
            std::cerr << "Request failed, error: " << e.what() << '\n';
        }
    }
}
#endif //TREE_VISUALIZER_CLIENT_TREE_VISUALIZER_HPP
