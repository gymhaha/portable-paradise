
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody,
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Pencil, 
  Trash2, 
  Save 
} from "lucide-react";
import { products } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";

// Define product schema
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  category: z.string().min(3, "Category is required"),
  price: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  stock: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number",
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isNew: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [productBeingEdited, setProductBeingEdited] = useState<number | null>(null);
  const [localProducts, setLocalProducts] = useState([...products]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState("");
  const [stockProductId, setStockProductId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      category: "Ultrabooks",
      price: "",
      stock: "",
      description: "",
      isNew: false,
      isFeatured: false,
    },
  });

  const handleEditStock = (productId: number, currentStock: number) => {
    setStockProductId(productId);
    setCurrentStock(currentStock.toString());
    setIsStockDialogOpen(true);
  };

  const saveStockChange = () => {
    if (stockProductId === null) return;
    
    const newStock = parseInt(currentStock);
    if (isNaN(newStock) || newStock < 0) {
      toast({
        title: "Invalid stock value",
        description: "Stock must be a non-negative number",
        variant: "destructive"
      });
      return;
    }

    setLocalProducts(prev => 
      prev.map(product => 
        product.id === stockProductId 
          ? { ...product, stock: newStock } 
          : product
      )
    );

    toast({
      title: "Stock updated",
      description: "Product stock has been updated successfully."
    });
    
    setIsStockDialogOpen(false);
  };

  const editProduct = (productId: number) => {
    const product = localProducts.find(p => p.id === productId);
    if (!product) return;
    
    form.reset({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      isNew: product.isNew,
      isFeatured: product.isFeatured,
    });
    
    setProductBeingEdited(productId);
    setIsEditingProduct(true);
    setIsAddProductOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setLocalProducts(prev => prev.filter(product => product.id !== productId));
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully."
      });
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    if (isEditingProduct && productBeingEdited) {
      // Update existing product
      setLocalProducts(prev => 
        prev.map(product => 
          product.id === productBeingEdited 
            ? { 
                ...product, 
                name: data.name,
                brand: data.brand,
                category: data.category,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                description: data.description,
                isNew: data.isNew,
                isFeatured: data.isFeatured,
              } 
            : product
        )
      );
      
      toast({
        title: "Product updated",
        description: "The product has been updated successfully."
      });
    } else {
      // Add new product
      const newId = Math.max(...localProducts.map(p => p.id)) + 1;
      
      setLocalProducts(prev => [
        ...prev,
        {
          id: newId,
          name: data.name,
          brand: data.brand,
          category: data.category,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          images: [
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop"
          ],
          image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop",
          rating: 4.5,
          reviewCount: 0,
          description: data.description,
          isNew: data.isNew,
          isFeatured: data.isFeatured,
          specs: {
            processor: "Not specified",
            memory: "Not specified",
            storage: "Not specified",
            display: "Not specified",
            graphics: "Not specified",
            operatingSystem: "Not specified",
            batteryLife: "Not specified",
            weight: "Not specified"
          }
        }
      ]);
      
      toast({
        title: "Product added",
        description: "The new product has been added successfully."
      });
    }
    
    setIsAddProductOpen(false);
    setIsEditingProduct(false);
    setProductBeingEdited(null);
    form.reset();
  };

  const openAddProductDialog = () => {
    form.reset({
      name: "",
      brand: "",
      category: "Ultrabooks",
      price: "",
      stock: "",
      description: "",
      isNew: false,
      isFeatured: false,
    });
    setIsEditingProduct(false);
    setProductBeingEdited(null);
    setIsAddProductOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Lappy Sale Admin Dashboard</h1>
      
      <Tabs defaultValue="products" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-white border shadow-sm rounded-md">
          <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4">
            <Package size={18} />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4">
            <ShoppingBag size={18} />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4">
            <Users size={18} />
            <span>Customers</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4">
            <BarChart size={18} />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-4">
            <Settings size={18} />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="border rounded-lg p-6 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download size={16} />
                  <span>Export</span>
                </Button>
                <Button onClick={openAddProductDialog} className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
                  <Plus size={16} />
                  <span>Add Product</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>A list of all the products.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-16 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <button 
                        onClick={() => handleEditStock(product.id, product.stock)}
                        className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded"
                      >
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </button>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => editProduct(product.id)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Stock Edit Dialog */}
          <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Stock</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  value={currentStock} 
                  onChange={(e) => setCurrentStock(e.target.value)}
                  min="0"
                  className="mt-1"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsStockDialogOpen(false)}>Cancel</Button>
                <Button onClick={saveStockChange} className="bg-black text-white hover:bg-gray-800">Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Add/Edit Product Dialog */}
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter brand name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              {...field}
                            >
                              <option value="Gaming Laptops">Gaming Laptops</option>
                              <option value="Business Laptops">Business Laptops</option>
                              <option value="Ultrabooks">Ultrabooks</option>
                              <option value="Macbooks">Macbooks</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0.00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex space-x-4 items-center md:col-span-2">
                      <FormField
                        control={form.control}
                        name="isNew"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Mark as New</FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="isFeatured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Feature on Homepage</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter product description"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsAddProductOpen(false);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      <Save size={16} className="mr-2" />
                      {isEditingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="orders" className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Orders</h2>
          <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
            <p className="text-gray-500">Order management coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="customers" className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Customers</h2>
          <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
            <p className="text-gray-500">Customer management coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Analytics</h2>
          <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
            <p className="text-gray-500">Analytics dashboard coming soon...</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Settings</h2>
          <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
            <p className="text-gray-500">Store settings coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
