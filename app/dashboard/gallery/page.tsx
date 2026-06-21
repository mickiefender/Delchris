'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Image,
  Upload,
  Trash2,
  Search,
  Loader2,
  X,
  Plus,
  GripVertical
} from 'lucide-react'

interface GalleryImage {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  created_at: string
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadPreview, setUploadPreview] = useState<string>('')
  const [uploadFormData, setUploadFormData] = useState({
    title: '',
    description: '',
    category: ''
  })

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery')
        const data = await res.json()
        setGallery(data.data || [])
      } catch (error) {
        console.error('Failed to fetch gallery:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGallery()
  }, [])

  const filteredGallery = gallery.filter((image) =>
    image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      setUploadPreview(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadFormData.title || !uploadPreview) {
      alert('Please fill in title and upload an image')
      return
    }

    setUploading(true)
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...uploadFormData,
          image_url: uploadPreview
        })
      })

      if (res.ok) {
        const data = await res.json()
        setGallery([data.data[0], ...gallery])
        setUploadFormData({ title: '', description: '', category: '' })
        setUploadPreview('')
        alert('Image uploaded successfully!')
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setGallery(gallery.filter((img) => img.id !== id))
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const categories = [...new Set(gallery.map((img) => img.category).filter(Boolean))]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading Gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-500 mt-1">Upload and manage gallery images</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {gallery.length} images
          </Badge>
        </div>
      </div>

      {/* Upload Form */}
      <Card className="border-2 border-dashed border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Image
          </CardTitle>
          <CardDescription>Add images to the website gallery</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image Title *</label>
                <Input
                  required
                  placeholder="e.g., Rice Processing Facility"
                  value={uploadFormData.title}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Input
                  placeholder="e.g., Operations, Community, Products"
                  value={uploadFormData.category}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, category: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input
                placeholder="Brief description of the image"
                value={uploadFormData.description}
                onChange={(e) => setUploadFormData({ ...uploadFormData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image File *</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
            </div>

            {uploadPreview && (
              <div className="relative h-48 rounded-lg overflow-hidden border">
                <img src={uploadPreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setUploadPreview('')}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Gallery Images
          </CardTitle>
          <CardDescription>
            {filteredGallery.length} image{filteredGallery.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by title, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant={searchTerm === '' ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSearchTerm('')}
              >
                All
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={searchTerm === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSearchTerm(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          )}

          {filteredGallery.length === 0 ? (
            <div className="text-center py-12">
              <Image className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No images in gallery yet</p>
              <p className="text-sm text-slate-400 mt-1">Upload your first image above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGallery.map((image) => (
              <div
                key={image.id}
                className="group rounded-lg overflow-hidden border bg-slate-50 hover:shadow-lg transition-all"
              >
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(image.image_url, '_blank')}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-slate-600 line-clamp-2 mb-2">{image.description}</p>
                  )}
                  {image.category && (
                    <Badge variant="secondary" className="text-xs">
                      {image.category}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
