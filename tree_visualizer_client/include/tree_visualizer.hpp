/**
 * @author Mattia Dei Rossi
 */

#ifndef TREE_VISUALIZER_HPP
#define TREE_VISUALIZER_HPP

#include "json.hpp"
#include "HTTPRequest.hpp"
#include "tree.h"

namespace tree_visualizer
{
    void to_json_array(PNode u, nlohmann::json& j){
        if (u) {
            j.push_back(u->key);
            to_json_array(u->left, j);
            to_json_array(u->right, j);
        }
    }
    void visualize(PNode u) {
        using json = nlohmann::json;

        try {
            http::Request request{"http://127.0.0.1:3000/sendGraph"};
            json body;
            to_json_array(u, body);
            std::cout<<body<<std::endl;

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
#endif //TREE_VISUALIZER_HPP
