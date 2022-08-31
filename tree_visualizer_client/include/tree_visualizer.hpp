/**
 * @author Mattia Dei Rossi
 */

#ifndef TREE_VISUALIZER_HPP
#define TREE_VISUALIZER_HPP

#include "json.hpp"
#include "HTTPRequest.hpp"
#include "tree.h"

namespace tree_serializer
{
    void preorder(PNode t,  nlohmann::json& j) {
        if (t != nullptr) {
            j.push_back(t->key);
            preorder(t->left, j);
            preorder(t->right, j);
        }
    }

    void postorder(PNode t,  nlohmann::json& j) {
        if (t != nullptr) {
            postorder(t->left, j);
            postorder(t->right, j);
            j.push_back(t->key);
        }
    }

    void inorder(PNode t, nlohmann::json& j) {
        if (t != nullptr) {
            inorder(t->left, j);
            j.push_back(t->key);
            inorder(t->right, j);
        }
    }
    void BFS_iter(PNode u, nlohmann::json& j){
        std::queue<PNode> q;
        q.push(u); //push root of tree
        while (!q.empty()) {
            PNode aux = q.front();
            q.pop();
            if (aux) {
                j.push_back(aux->key);
                q.push(aux->left);
                q.push(aux->right);
            }
        }
    }
    void visualizeTree(PNode u) {
        using json = nlohmann::json;

        try {
            http::Request request{"http://127.0.0.1:3000/sendTree"};
            json body;
            BFS_iter(u, body);
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

    nlohmann::json serialize_traversals(PNode u){
        nlohmann::json j1;
        // TODO: serialize_traversals
        return j1;
    }
    void show_traversals(PNode u){
        using json = nlohmann::json;

        try {
            http::Request request{"http://127.0.0.1:3000/sendTraversals"};
            json body = serialize_traversals(u);
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
