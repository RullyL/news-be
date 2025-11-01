import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.create({
      data: { name, slug },
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = await prisma.category.update({
      where: { id: parseInt(req.params.id) },
      data: { name, slug },
    });
    res.json({ message: "Category updated", category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
