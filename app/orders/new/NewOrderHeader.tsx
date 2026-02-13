
'use client';

interface NewOrderHeaderProps {
  currentStep: number;
  onSaveDraft: () => void;
  onSubmitOrder: () => void;
  canSubmit: boolean;
}

const steps = [
  { number: 1, title: 'Retailer Selection', icon: 'ri-store-line' },
  { number: 2, title: 'Product Selection', icon: 'ri-shopping-bag-line' },
  { number: 3, title: 'Shipping Details', icon: 'ri-truck-line' },
  { number: 4, title: 'Order Review', icon: 'ri-file-list-3-line' }
];

export default function NewOrderHeader({ 
  currentStep, 
  onSaveDraft, 
  onSubmitOrder, 
  canSubmit 
}: NewOrderHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">New Order</h1>
          <p className="text-gray-600 mt-1">Create an order for an accepted retailer</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onSaveDraft}
            className="flex items-center px-6 py-3 border-2 border-orange-400 text-orange-600 bg-white rounded-xl hover:bg-orange-50 transition-colors cursor-pointer whitespace-nowrap font-medium"
          >
            <i className="ri-draft-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Save as Draft
          </button>
          <button
            onClick={onSubmitOrder}
            disabled={!canSubmit}
            className={`flex items-center px-6 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap font-semibold ${
              canSubmit
                ? 'bg-lime-600 text-white hover:bg-lime-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Submit Order
          </button>
        </div>
      </div>
      
      {/* Step Progress Indicator */}
      <div className="flex items-center justify-between max-w-4xl">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                step.number === currentStep 
                  ? 'bg-lime-600 border-lime-600 text-white' 
                  : step.number < currentStep
                  ? 'bg-lime-100 border-lime-600 text-lime-600'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {step.number < currentStep ? (
                  <i className="ri-check-line text-lg"></i>
                ) : (
                  <i className={`${step.icon} text-lg`}></i>
                )}
              </div>
              <div className="ml-4 min-w-0">
                <p className={`text-sm font-medium ${
                  step.number === currentStep 
                    ? 'text-lime-600' 
                    : step.number < currentStep
                    ? 'text-lime-600'
                    : 'text-gray-400'
                }`}>
                  Step {step.number}
                </p>
                <p className={`text-sm ${
                  step.number === currentStep 
                    ? 'text-gray-800 font-semibold' 
                    : step.number < currentStep
                    ? 'text-gray-600'
                    : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
            </div>
            
            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-8">
                <div className={`h-0.5 ${
                  step.number < currentStep 
                    ? 'bg-lime-600' 
                    : 'bg-gray-200'
                }`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
