import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownMenuDemo({ onSelectClassification }: { onSelectClassification: (classification: string) => void }) {

return (
    <div >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Choose</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto overflow-x-visible">
          {/* Assets */}
          <DropdownMenuLabel>Assets</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Current Assets</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Cash and Cash Equivalents")}>
                    <span>Cash and Cash Equivalents</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Trade and other Receivables")}>
                    <span>Trade and other Receivables</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Inventories")}>
                    <span>Inventories</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Prepayments")}>
                    <span>Prepayments</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Financial Assets")}>
                    <span>Financial Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Due from related parties")}>
                    <span>Due from related parties</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Term Deposits")}>
                    <span>Term Deposits</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Non-Current Assets</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Term deposits")}>
                    <span>Term deposits</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Property, Plant and Equipment")}>
                    <span>Property, Plant and Equipment</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Intangible Assets")}>
                    <span>Intangible Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Investment Properties")}>
                    <span>Investment Properties</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Financial assets")}>
                    <span>Financial assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Deferred Tax Assets")}>
                    <span>Deferred Tax Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Biological Assets")}>
                    <span>Biological Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Goodwill")}>
                    <span>Goodwill</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Investment in listed entities")}>
                    <span>Investment in listed entities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Investment in closed entities")}>
                    <span>Investment in closed entities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Capital work in progress")}>
                    <span>Capital work in progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Other investments")}>
                    <span>Other investments</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          {/* Liabilities */}
          <DropdownMenuLabel>Liabilities</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Current Liabilities</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Trade and Other payables")}>
                    <span>Trade and Other payables</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Short-Term Borrowings")}>
                    <span>Short-Term Borrowings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Current Portion of Long-Term Debt")}>
                    <span>Current Portion of Long-Term Debt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Provision (short-term)")}>
                    <span>Provision (short-term)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Deferred Revenue")}>
                    <span>Deferred Revenue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Current Tax Liabilities")}>
                    <span>Current Tax Liabilities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Finance lease obligations")}>
                    <span>Finance lease obligations</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Accruals and other credit")}>
                    <span>Accruals and other credit</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Non-Current Liabilities</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Long-Term Debt")}>
                    <span>Long-Term Debt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Employee benefits")}>
                    <span>Employee benefits</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Deferred Tax Liabilities")}>
                    <span>Deferred Tax Liabilities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Provisions")}>
                    <span>Provisions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Finance Lease Liabilities")}>
                    <span>Finance Lease Liabilities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Other Long-Term Liabilities")}>
                    <span>Other Long-Term Liabilities</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          {/* Equity */}
          <DropdownMenuLabel>Equity</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Share Capital</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Ordinary Shares")}>
                    <span>Ordinary Shares</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Preference Shares")}>
                    <span>Preference Shares</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick= {() =>onSelectClassification("Statutory reserve")}>
              <span>Statutory reserve</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick= {() =>onSelectClassification("Share Premium")}>
              <span>Share Premium</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick= {() =>onSelectClassification("Retained Earnings")}>
              <span>Retained Earnings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick= {() =>onSelectClassification("Revaluation surplus")}>
              <span>Revaluation surplus</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Other Reserves</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Translation Reserves")}>
                    <span>Translation Reserves</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Hedging Reserve")}>
                    <span>Hedging Reserve</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Fair Value Reserve")}>
                    <span>Fair Value Reserve</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick= {() =>onSelectClassification("Non-Controlling Interest")}>
              <span>Non-Controlling Interest</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          {/* Income */}
          <DropdownMenuLabel>Income</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Revenue</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Sales Revenue")}>
                    <span>Sales Revenue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Service Revenue")}>
                    <span>Service Revenue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Interest Income")}>
                    <span>Interest Income</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Dividend Income")}>
                    <span>Dividend Income</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Rental Income")}>
                    <span>Rental Income</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Other Income</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Gains on Disposal of Assets")}>
                    <span>Gains on Disposal of Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Investment Gains")}>
                    <span>Investment Gains</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Foreign Exchange Gains")}>
                    <span>Foreign Exchange Gains</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Fair Value Gains")}>
                    <span>Fair Value Gains</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          {/* Expenses */}
          <DropdownMenuLabel>Expenses</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick= {() =>onSelectClassification("Cost of Sales")}>
              <span>Cost of Sales</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Operating Expenses</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Selling and Distribution Expenses")}>
                    <span>Selling and Distribution Expenses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("General and Administrative Expenses")}>
                    <span>General and Administrative Expenses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Research and Development Expenses")}>
                    <span>Research and Development Expenses</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem onClick= {() =>onSelectClassification("Employee Benefit Expenses")}>
              <span>Employee Benefit Expenses</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Finance Costs</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Interest Expenses")}>
                    <span>Interest Expenses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Bank Charges")}>
                    <span>Bank Charges</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Depreciation and Amortization</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Depreciation")}>
                    <span>Depreciation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Amortization")}>
                    <span>Amortization</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem onClick= {() =>onSelectClassification("Impairment Losses")}>
              <span>Impairment Losses</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Other Expenses</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Losses on Disposal of Assets")}>
                    <span>Losses on Disposal of Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Foreign Exchange Losses")}>
                    <span>Foreign Exchange Losses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Legal and Professional Fees")}>
                    <span>Legal and Professional Fees</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick= {() =>onSelectClassification("Provision Expenses")}>
                    <span>Provision Expenses</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
