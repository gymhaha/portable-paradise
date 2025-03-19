
import React from 'react';
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
import { useState } from 'react';
import { products } from '@/lib/data';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Lappy Sale Admin Dashboard</h1>
      
      <Tabs defaultValue="products" onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-white border">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="border rounded-lg p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Products</h2>
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Add New Product
            </button>
          </div>
          
          <Table>
            <TableCaption>A list of all the products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
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
                  <TableCell>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800">Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="orders" className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6">Orders</h2>
          <p className="text-gray-500">Order management coming soon...</p>
        </TabsContent>
        
        <TabsContent value="customers" className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6">Customers</h2>
          <p className="text-gray-500">Customer management coming soon...</p>
        </TabsContent>
        
        <TabsContent value="analytics" className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6">Analytics</h2>
          <p className="text-gray-500">Analytics dashboard coming soon...</p>
        </TabsContent>
        
        <TabsContent value="settings" className="border rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-6">Settings</h2>
          <p className="text-gray-500">Store settings coming soon...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
