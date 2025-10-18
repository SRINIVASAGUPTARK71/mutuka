"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { paymentService, PaymentItem } from "@/services/paymentService";

// Sample payment data matching your image
const paymentData = [
  {
    id: "1001",
    reason: "Invoice Payment",
    itemCount: 5,
    skipped: 1,
    success: 3,
    failed: 1,
    usdAmount: "$250",
    cdfAmount: "500,000 CDF",
    createdAt: "8 Sep, 2025",
    updatedAt: "12 Sep, 2025",
    status: "Success",
  },
  {
    id: "1002",
    reason: "Subscription Fee",
    itemCount: 2,
    skipped: 0,
    success: 2,
    failed: 0,
    usdAmount: "$20",
    cdfAmount: "40,000 CDF",
    createdAt: "21 Sep, 2025",
    updatedAt: "30 Sep, 2025",
    status: "Success",
  },
  {
    id: "1003",
    reason: "Refund Process",
    itemCount: 3,
    skipped: 0,
    success: 0,
    failed: 3,
    usdAmount: "$0",
    cdfAmount: "0 CDF",
    createdAt: "1 Feb, 2025",
    updatedAt: "23 Feb, 2025",
    status: "Failed",
  },
];

type SortConfig = {
  key: string;
  direction: "asc" | "desc" | null;
};

export default function PaymentPage() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });
  const [data, setData] = useState<PaymentItem[]>(paymentData);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await paymentService.getPayments();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        // Keep the sample data on error
        setData(paymentData);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Function to fetch sorted data from API
  const fetchSortedData = async (
    sortKey: string,
    sortDirection: "asc" | "desc" | null
  ) => {
    setLoading(true);
    try {
      // Use the payment service to fetch sorted data
      const sortedData = await paymentService.getSortedPayments(
        sortKey,
        sortDirection
      );
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sorted data:", error);
      // On error, keep the current data and stop loading
      setLoading(false);

      // You might want to show a toast notification here
      // toast.error('Failed to sort data. Please try again.');
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
    fetchSortedData(key, direction);
  };

  const SortableHeader = ({
    column,
    children,
    className = "",
  }: {
    column: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    const isActive = sortConfig.key === column;
    const direction = isActive ? sortConfig.direction : null;

    return (
      <TableHead
        className={`cursor-pointer select-none hover:bg-gray-50 ${
          loading && isActive ? "opacity-50" : ""
        } ${className}`}
        onClick={() => !loading && handleSort(column)}
      >
        <div className="flex items-center justify-between">
          <span>{children}</span>
          <div className="flex flex-col ml-1">
            {loading && isActive ? (
              <div className="animate-spin h-3 w-3 border border-blue-600 border-t-transparent rounded-full" />
            ) : (
              <>
                <ChevronUp
                  className={`h-3 w-3 ${
                    isActive && direction === "asc"
                      ? "text-blue-600"
                      : "text-gray-300"
                  }`}
                />
                <ChevronDown
                  className={`h-3 w-3 -mt-1 ${
                    isActive && direction === "desc"
                      ? "text-blue-600"
                      : "text-gray-300"
                  }`}
                />
              </>
            )}
          </div>
        </div>
      </TableHead>
    );
  };
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>

          {/* Filter and New Payment Button */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="default">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>+ New payment</Button>
          </div>
        </div>

        {/* Payment Table */}
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Sr No</TableHead>
                <SortableHeader column="id" className="w-20">
                  ID
                </SortableHeader>
                <SortableHeader column="reason">Reason (Title)</SortableHeader>
                <SortableHeader column="itemCount" className="w-24">
                  Item Count
                </SortableHeader>
                <SortableHeader column="skipped" className="w-20">
                  Skipped
                </SortableHeader>
                <SortableHeader column="success" className="w-20">
                  Success
                </SortableHeader>
                <SortableHeader column="failed" className="w-20">
                  Failed
                </SortableHeader>
                <SortableHeader column="usdAmount" className="w-24">
                  USD Amount
                </SortableHeader>
                <SortableHeader column="cdfAmount" className="w-28">
                  CDF Amount
                </SortableHeader>
                <SortableHeader column="createdAt" className="w-24">
                  Created At
                </SortableHeader>
                <SortableHeader column="updatedAt" className="w-24">
                  Updated At
                </SortableHeader>
                <SortableHeader column="status" className="w-20">
                  Status
                </SortableHeader>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialLoading ? (
                <TableRow>
                  <TableCell colSpan={13} className="h-32 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full" />
                      <span>Loading payments...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={13}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((payment, index) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.reason}</TableCell>
                    <TableCell>{payment.itemCount}</TableCell>
                    <TableCell>{payment.skipped}</TableCell>
                    <TableCell>{payment.success}</TableCell>
                    <TableCell>{payment.failed}</TableCell>
                    <TableCell>{payment.usdAmount}</TableCell>
                    <TableCell>{payment.cdfAmount}</TableCell>
                    <TableCell className="text-muted-foreground text-center">
                      <div className="inline-block border border-[#E5E5E5] px-2 py-1 rounded-md">
                        {payment.createdAt}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center">
                      <div className="inline-block border border-[#E5E5E5] px-2 py-1 rounded-md">
                        {payment.updatedAt}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center gap-2 border border-[#E5E5E5] px-2 py-1.5 rounded-md">
                        <div
                          className={`h-3 w-3 rounded-full flex-shrink-0 ${
                            payment.status === "Success"
                              ? "bg-green-500"
                              : payment.status === "Failed"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <span className="text-sm font-medium whitespace-nowrap leading-tight">
                          {payment.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
