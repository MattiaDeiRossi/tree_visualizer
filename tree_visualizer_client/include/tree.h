/**
 * @author Mattia Dei Rossi
 */

#ifndef TREE__H
#define TREE_H
#include <queue>
#include <iostream>

struct Node{
    int key;
    Node* left;
    Node* right;
    Node(int k, Node* sx = nullptr, Node* dx = nullptr)
            : key{k}, left{sx}, right{dx} {}
};
typedef Node* PNode;

namespace tree {
    void preorder(PNode t) {
        if (t != nullptr) {
            std::cout << t->key << " ";
            preorder(t->left);
            preorder(t->right);
        }
    }

    void postorder(PNode t) {
        if (t != nullptr) {
            postorder(t->left);
            postorder(t->right);
            std::cout << t->key << " ";
        }
    }

    void inorder(PNode t) {
        if (t != nullptr) {
            inorder(t->left);
            std::cout << t->key << " ";
            inorder(t->right);
        }
    }

    void BFS_iter(PNode node) {
        std::queue<PNode> q;
        q.push(node);
        while (!q.empty()) {
            PNode aux = q.front();
            q.pop();
            if (aux) {
                std::cout << aux->key << " ";
                q.push(aux->left);
                q.push(aux->right);
            }
        }
    }

}
#endif //TREE_H
