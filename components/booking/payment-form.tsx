"use client"

import { useState } from "react"
import { CreditCard, Calendar, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  return (
    <div className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit-card" id="credit-card" />
          <Label htmlFor="credit-card" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Credit / Debit Card
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="upi" id="upi" />
          <Label htmlFor="upi">UPI Payment</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="net-banking" id="net-banking" />
          <Label htmlFor="net-banking">Net Banking</Label>
        </div>
      </RadioGroup>

      {paymentMethod === "credit-card" && (
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                maxLength={19}
                onChange={(e) => {
                  // Format card number with spaces
                  const value = e.target.value.replace(/\s/g, "")
                  const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim()
                  e.target.value = formattedValue
                }}
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <div className="relative">
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  className="pl-10"
                  maxLength={5}
                  onChange={(e) => {
                    // Format expiry date with slash
                    const value = e.target.value.replace(/\D/g, "")
                    if (value.length <= 2) {
                      e.target.value = value
                    } else {
                      e.target.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
                    }
                  }}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input id="cvv" placeholder="123" className="pl-10" maxLength={3} type="password" />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Cardholder Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="upi-id">UPI ID</Label>
            <Input id="upi-id" placeholder="yourname@upi" />
          </div>
        </div>
      )}

      {paymentMethod === "net-banking" && (
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="bank">Select Bank</Label>
            <select
              id="bank"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
            </select>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-500 flex items-center gap-2 pt-4">
        <Lock className="h-4 w-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  )
}
