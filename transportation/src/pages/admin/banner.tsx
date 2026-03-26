"use client";

import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import { Plus, Edit, Trash } from "lucide-react";
import bannerSvc from "../../services/banner.service";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const BannerPage: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch banners
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response: any = await bannerSvc.getRequest("/banners");
      setBanners(response.data || []);
    } catch {
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Delete banner
  const handleDelete = async (id: string) => {
    try {
      await bannerSvc.deleteRequest(`/banners/${id}`);
      toast.success("Banner deleted successfully");
      fetchBanners();
    } catch {
      toast.error("Delete operation failed");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: any) =>
        image?.optimizedUrl ? (
          <img
            src={image.optimizedUrl}
            alt="banner"
            className="w-24 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-24 h-16 bg-slate-200 flex items-center justify-center rounded">
            No Image
          </div>
        ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link: string) =>
        link ? (
          <a href={link} target="_blank" rel="noreferrer" className="text-blue-600">
            {link}
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="default"
            icon={<Edit size={16} />}
            onClick={() => navigate(`/admin/banners/update/${record._id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this banner?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<Trash size={16} />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Banner Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Total {banners.length} banners active for Suvyatra
          </p>
        </div>
        <Button
          type="primary"
          className="flex items-center gap-2"
          onClick={() => navigate("add-banner")}
        >
          <Plus size={16} /> Add New Banner
        </Button>
      </div>

      {/* Banner Table */}
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={banners}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default BannerPage;