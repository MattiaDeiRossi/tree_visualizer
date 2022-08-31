#include "tree_visualizer.hpp"

int main( const int argc, const char** argv )
{
    PNode root = new Node(4);
    root->left = new Node(2);
    root->left->right = new Node(3);
    root->right = new Node(6);
    root->left->left = new Node(1);

    tree_serializer::visualizeTree(root);
}