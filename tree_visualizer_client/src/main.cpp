#include "tree_visualizer.hpp"

int main( const int argc, const char** argv )
{
    PNode root = new Node(4);
    root->left = new Node(2);
    root->left->right = new Node(3);
    root->right = new Node(6);
    root->left->left = new Node(1);

    tree::preorder(root);
    std::cout<<std::endl;
    tree::inorder(root);
    std::cout<<std::endl;
    tree::postorder(root);
    std::cout<<std::endl;
    tree::BFS_iter(root);
    std::cout<<std::endl;
    tree_visualizer::visualize(root);
}