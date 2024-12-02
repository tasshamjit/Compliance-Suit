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

export function DropdownMenuDemo() {
  return (
    <div >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
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
                  <DropdownMenuItem>
                    <span>Cash and Cash Equivalents</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Trade and other Receivables</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Inventories</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Prepayments</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Financial Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Due from related parties</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Term deposits</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Property, Plant and Equipment</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Intangible Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Investment Properties</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Financial assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Deferred Tax Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Biological Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Goodwill</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Investment in listed entities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Investment in closed entities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Capital work in progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Trade and Other payables</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Short-Term Borrowings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Current Portion of Long-Term Debt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Provision (short-term)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Deferred Revenue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Current Tax Liabilities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Finance lease obligations</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Long-Term Debt</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Employee benefits</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Deferred Tax Liabilities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Provisions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Finance Lease Liabilities</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Ordinary Shares</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Preference Shares</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <span>Statutory reserve</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Share Premium</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Retained Earnings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Revaluation surplus</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Other Reserves</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Translation Reserves</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Hedging Reserve</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Fair Value Reserve</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Sales Revenue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Service Revenue</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Interest Income</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Dividend Income</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Gains on Disposal of Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Investment Gains</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Foreign Exchange Gains</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
            <DropdownMenuItem>
              <span>Cost of Sales</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Operating Expenses</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Selling and Distribution Expenses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>General and Administrative Expenses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Research and Development Expenses</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem>
              <span>Employee Benefit Expenses</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Finance Costs</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Interest Expenses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
                  <DropdownMenuItem>
                    <span>Depreciation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Amortization</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem>
              <span>Impairment Losses</span>
            </DropdownMenuItem>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Other Expenses</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Losses on Disposal of Assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Foreign Exchange Losses</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Legal and Professional Fees</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
