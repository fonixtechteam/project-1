
'use client';

import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import InventoryHeader from './InventoryHeader';
import InventoryTabs from './InventoryTabs';
import SKUTable from './SKUTable';
import FiltersSidebar from './FiltersSidebar';

// Sample SKU data with enhanced fields
const sampleSKUs = [
  {
    id: '1',
    skuCode: 'VCS-30ML-001',
    ean: '1234567890123',
    upc: '123456789012',
    brandName: 'Glow Beauty',
    productName: 'Vitamin C Brightening Serum',
    category: 'Skincare',
    subCategory: 'Serums',
    packSize: '30',
    uom: 'ml',
    moq: 100,
    msrp: 45.99,
    wholesalePrice: 22.50,
    shelfLife: 24,
    storageConditions: 'Store in cool, dry place below 25°C',
    complianceStatus: 'approved' as const,
    assetsCount: 5,
    docsCount: 3,
    status: 'approved' as const,
    lastModified: '2 days ago',
    activeIngredients: ['Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
    complianceDocs: [
      { name: 'COA Certificate.pdf', status: 'approved' as const, uploadDate: '2024-01-15' },
      { name: 'Safety Data Sheet.pdf', status: 'approved' as const, uploadDate: '2024-01-10' },
      { name: 'FDA Registration.pdf', status: 'approved' as const, uploadDate: '2024-01-08' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '2',
    skuCode: 'O3-1000MG-60',
    ean: '2345678901234',
    upc: '234567890123',
    brandName: 'Pure Health',
    productName: 'Omega-3 Fish Oil Capsules',
    category: 'Supplements',
    subCategory: 'Omega-3',
    packSize: '60',
    uom: 'capsules',
    moq: 200,
    msrp: 29.99,
    wholesalePrice: 15.00,
    shelfLife: 36,
    storageConditions: 'Store in cool, dry place. Refrigerate after opening',
    complianceStatus: 'pending' as const,
    assetsCount: 3,
    docsCount: 2,
    status: 'submitted' as const,
    lastModified: '1 day ago',
    activeIngredients: ['EPA', 'DHA', 'Omega-3 Fatty Acids'],
    complianceDocs: [
      { name: 'Third-party Testing.pdf', status: 'pending' as const, uploadDate: '2024-01-20' },
      { name: 'GMP Certificate.pdf', status: 'approved' as const, uploadDate: '2024-01-18' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '3',
    skuCode: 'CP-250G-VAN',
    ean: '3456789012345',
    upc: '345678901234',
    brandName: 'Vital Nutrition',
    productName: 'Premium Collagen Powder - Vanilla',
    category: 'Supplements',
    subCategory: 'Protein',
    packSize: '250',
    uom: 'g',
    moq: 50,
    msrp: 89.99,
    wholesalePrice: 45.00,
    shelfLife: 24,
    storageConditions: 'Keep sealed in original container',
    complianceStatus: 'missing' as const,
    assetsCount: 4,
    docsCount: 1,
    status: 'draft' as const,
    lastModified: '5 days ago',
    activeIngredients: ['Hydrolyzed Collagen', 'Vitamin C', 'Biotin'],
    complianceDocs: [
      { name: 'Product Specification.pdf', status: 'missing' as const, uploadDate: '2024-01-12' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '4',
    skuCode: 'PB-50B-DAY',
    ean: '4567890123456',
    upc: '456789012345',
    brandName: 'Gut Health Pro',
    productName: 'Daily Probiotic Capsules',
    category: 'Supplements',
    subCategory: 'Probiotics',
    packSize: '50',
    uom: 'capsules',
    moq: 150,
    msrp: 39.99,
    wholesalePrice: 20.00,
    shelfLife: 18,
    storageConditions: 'Refrigerate after opening. Keep dry',
    complianceStatus: 'rejected' as const,
    assetsCount: 2,
    docsCount: 2,
    status: 'rejected' as const,
    lastModified: '1 week ago',
    activeIngredients: ['Lactobacillus', 'Bifidobacterium', 'Prebiotic Fiber'],
    complianceDocs: [
      { name: 'Potency Testing.pdf', status: 'rejected' as const, uploadDate: '2024-01-05' },
      { name: 'Stability Study.pdf', status: 'pending' as const, uploadDate: '2024-01-03' }
    ],
    productImages: ['image1.jpg', 'image2.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '5',
    skuCode: 'HA-100ML-PMP',
    ean: '5678901234567',
    upc: '567890123456',
    brandName: 'Glow Beauty',
    productName: 'Hyaluronic Acid Serum - Premium',
    category: 'Skincare',
    subCategory: 'Serums',
    packSize: '100',
    uom: 'ml',
    moq: 75,
    msrp: 79.99,
    wholesalePrice: 40.00,
    shelfLife: 30,
    storageConditions: 'Store in cool place, avoid direct sunlight',
    complianceStatus: 'approved' as const,
    assetsCount: 6,
    docsCount: 4,
    status: 'approved' as const,
    lastModified: '3 days ago',
    activeIngredients: ['Hyaluronic Acid', 'Vitamin B5', 'Aloe Vera'],
    complianceDocs: [
      { name: 'Dermatologist Test.pdf', status: 'approved' as const, uploadDate: '2024-01-22' },
      { name: 'Allergen Test.pdf', status: 'approved' as const, uploadDate: '2024-01-20' },
      { name: 'Stability Report.pdf', status: 'approved' as const, uploadDate: '2024-01-18' },
      { name: 'COA Analysis.pdf', status: 'approved' as const, uploadDate: '2024-01-15' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '6',
    skuCode: 'RC-50ML-NIT',
    ean: '6789012345678',
    upc: '678901234567',
    brandName: 'Glow Beauty',
    productName: 'Retinol Night Cream',
    category: 'Skincare',
    subCategory: 'Moisturizers',
    packSize: '50',
    uom: 'ml',
    moq: 100,
    msrp: 65.99,
    wholesalePrice: 30.00,
    shelfLife: 24,
    storageConditions: 'Store in cool, dark place',
    complianceStatus: 'pending' as const,
    assetsCount: 4,
    docsCount: 2,
    status: 'submitted' as const,
    lastModified: '4 days ago',
    activeIngredients: ['Retinol', 'Ceramides', 'Peptides'],
    complianceDocs: [
      { name: 'Efficacy Study.pdf', status: 'pending' as const, uploadDate: '2024-01-25' },
      { name: 'Safety Assessment.pdf', status: 'pending' as const, uploadDate: '2024-01-23' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '7',
    skuCode: 'MB-90CAP-MEN',
    ean: '7890123456789',
    upc: '789012345678',
    brandName: 'Vital Nutrition',
    productName: 'Men\'s Daily Multivitamin',
    category: 'Supplements',
    subCategory: 'Vitamins',
    packSize: '90',
    uom: 'capsules',
    moq: 120,
    msrp: 34.99,
    wholesalePrice: 17.50,
    shelfLife: 36,
    storageConditions: 'Store in cool, dry place',
    complianceStatus: 'approved' as const,
    assetsCount: 3,
    docsCount: 3,
    status: 'approved' as const,
    lastModified: '6 days ago',
    activeIngredients: ['Vitamin D3', 'B-Complex', 'Zinc', 'Lycopene'],
    complianceDocs: [
      { name: 'USP Verification.pdf', status: 'approved' as const, uploadDate: '2024-01-14' },
      { name: 'Heavy Metals Test.pdf', status: 'approved' as const, uploadDate: '2024-01-12' },
      { name: 'Potency Analysis.pdf', status: 'approved' as const, uploadDate: '2024-01-10' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    primaryImageIndex: 0
  },
  {
    id: '8',
    skuCode: 'EO-10ML-LAV',
    ean: '8901234567890',
    upc: '890123456789',
    brandName: 'Nature\'s Essence',
    productName: 'Pure Lavender Essential Oil',
    category: 'Wellness',
    subCategory: 'Essential Oils',
    packSize: '10',
    uom: 'ml',
    moq: 200,
    msrp: 24.99,
    wholesalePrice: 12.50,
    shelfLife: 60,
    storageConditions: 'Store in dark, cool place. Keep tightly sealed',
    complianceStatus: 'approved' as const,
    assetsCount: 5,
    docsCount: 2,
    status: 'approved' as const,
    lastModified: '1 week ago',
    activeIngredients: ['Lavandula Angustifolia', 'Linalool', 'Linalyl Acetate'],
    complianceDocs: [
      { name: 'GC-MS Analysis.pdf', status: 'approved' as const, uploadDate: '2024-01-16' },
      { name: 'Organic Certificate.pdf', status: 'approved' as const, uploadDate: '2024-01-14' }
    ],
    productImages: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'],
    primaryImageIndex: 0
  }
];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSKUs, setSelectedSKUs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    moqRange: [0, 1000],
    priceRange: [0, 100],
    complianceStatus: '',
    countries: [] as string[]
  });

  const handleSelectSKU = (id: string) => {
    setSelectedSKUs(prev =>
      prev.includes(id)
        ? prev.filter(skuId => skuId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const filteredSKUs = sampleSKUs.filter(sku => {
        if (activeTab === 'pending' && sku.status !== 'submitted') return false;
        if (activeTab === 'approved' && sku.status !== 'approved') return false;
        if (activeTab === 'hidden' && ![ 'rejected', 'hidden'].includes(sku.status)) return false;

        if (searchQuery && !sku.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !sku.skuCode.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        if (filters.status && sku.status !== filters.status) return false;
        if (filters.category && sku.category !== filters.category) return false;
        if (filters.complianceStatus && sku.complianceStatus !== filters.complianceStatus) return false;

        return true;
      });
      setSelectedSKUs(filteredSKUs.map(sku => sku.id));
    } else {
      setSelectedSKUs([]);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on SKUs:`, selectedSKUs);
    setSelectedSKUs([]);
  };

  const filteredSKUs = sampleSKUs.filter(sku => {
    if (activeTab === 'pending' && sku.status !== 'submitted') return false;
    if (activeTab === 'approved' && sku.status !== 'approved') return false;
    if (activeTab === 'hidden' && ![ 'rejected', 'hidden'].includes(sku.status)) return false;

    if (searchQuery && !sku.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !sku.skuCode.toLowerCase().includes(searchQuery.toLowerCase())) return false;

    if (filters.status && sku.status !== filters.status) return false;
    if (filters.category && sku.category !== filters.category) return false;
    if (filters.complianceStatus && sku.complianceStatus !== filters.complianceStatus) return false;

    return true;
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <InventoryHeader
            onSearch={setSearchQuery}
            onToggleFilters={() => setShowFilters(!showFilters)}
            selectedCount={selectedSKUs.length}
          />

          <div className="mt-6">
            <InventoryTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              skuCounts={{
                all: sampleSKUs.length,
                pending: sampleSKUs.filter(s => s.status === 'submitted').length,
                approved: sampleSKUs.filter(s => s.status === 'approved').length,
                hidden: sampleSKUs.filter(s => [ 'rejected', 'hidden'].includes(s.status)).length
              }}
            />
          </div>

          <div className="mt-6 flex gap-6">
            {showFilters && (
              <div className="w-80">
                <FiltersSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  totalCount={sampleSKUs.length}
                  filteredCount={filteredSKUs.length}
                />
              </div>
            )}

            <div className="flex-1">
              <SKUTable
                skus={filteredSKUs}
                selectedSKUs={selectedSKUs}
                onSelectSKU={handleSelectSKU}
                onSelectAll={handleSelectAll}
                onBulkAction={handleBulkAction}
                activeTab={activeTab}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
