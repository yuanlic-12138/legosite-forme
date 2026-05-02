import type { Project, ProjectFormData, Product, ProductFormData, Profile, Contact, About } from '../types/portfolio';

const API_BASE = '/api';

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE}/projects`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects/${id}`);
  if (!response.ok) throw new Error('Failed to fetch project');
  return response.json();
}

export async function createProject(data: ProjectFormData): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project> {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete project');
}

export async function fetchTags(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/projects/tags/all`);
  if (!response.ok) throw new Error('Failed to fetch tags');
  return response.json();
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}

export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
}

export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
}

export async function fetchProductCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function fetchProductTags(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/products/tags`);
  if (!response.ok) throw new Error('Failed to fetch product tags');
  return response.json();
}

export async function uploadImage(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/upload/image`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload image');
  return response.json();
}

export async function uploadVideo(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/upload/video`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload video');
  return response.json();
}

export async function deleteMedia(type: 'images' | 'videos', filename: string): Promise<void> {
  const response = await fetch(`${API_BASE}/upload/${type}/${filename}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete media');
}

export interface FileItem {
  filename: string;
  originalname: string;
  url: string;
  size: number;
  createdAt: string;
}

export async function uploadFile(file: File): Promise<FileItem> {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/upload/file`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload file');
  return response.json();
}

export async function fetchFiles(): Promise<FileItem[]> {
  const response = await fetch(`${API_BASE}/upload/files`);
  if (!response.ok) throw new Error('Failed to fetch files');
  return response.json();
}

export async function deleteFile(filename: string): Promise<void> {
  const response = await fetch(`${API_BASE}/upload/files/${filename}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete file');
}

export async function fetchProfile(): Promise<Profile> {
  const response = await fetch(`${API_BASE}/profile`);
  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const response = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
}

export async function fetchContact(): Promise<Contact> {
  const response = await fetch(`${API_BASE}/contact`);
  if (!response.ok) throw new Error('Failed to fetch contact');
  return response.json();
}

export async function updateContact(data: Partial<Contact>): Promise<Contact> {
  const response = await fetch(`${API_BASE}/contact`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
}

export async function fetchAbout(): Promise<About> {
  const response = await fetch(`${API_BASE}/about`);
  if (!response.ok) throw new Error('Failed to fetch about');
  return response.json();
}

export async function updateAbout(data: Partial<About>): Promise<About> {
  const response = await fetch(`${API_BASE}/about`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update about');
  return response.json();
}
