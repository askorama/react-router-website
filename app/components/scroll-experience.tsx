import { useActor } from "~/stage";

export function BrowserChrome({
  children,
  url = "https://example.com",
}: {
  children: React.ReactNode;
  url?: string;
}) {
  return (
    <div className="bg-gray-700 border border-gray-600 drop-shadow-lg rounded-xl overflow-hidden">
      <div className="pb-[0.5em] border-b border-gray-500">
        <div className="flex p-[0.75em]">
          <WindowButton className="bg-red-400" />
          <WindowButton className="bg-yellow-400" />
          <WindowButton className="bg-green-300" />
        </div>
        <div className="flex items-center px-[0.5em]">
          <IconArrowLeft />
          <IconArrowLeft className="rotate-180 ml-[0.75em]" />
          <IconRefresh className="rotate ml-[0.75em]" />
          <div className="ml-[0.75em] bg-gray-800 rounded-full px-[1em] py-[0.25em] w-full text-[85%]">
            {url}
          </div>
        </div>
      </div>
      <div className="text-[75%]">{children}</div>
    </div>
  );
}

function WindowButton({ className }: { className: string }) {
  return (
    <div
      className={`rounded-full mr-[0.5em] inline-block h-[0.75em] w-[0.75em] ${className}`}
    />
  );
}

function IconArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[1.25em] w-[1.25em] ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}

function IconRefresh({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[1.25em] w-[1.25em] ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9"
      />
    </svg>
  );
}

export function FastbooksApp({
  children,
  highlight,
}: {
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex relative">
      <div className="p-[1em] border-r border-gray-500">
        <div className="px-[0.5em] pb-[0.5em] flex items-center">
          <div className="h-[0.75em] w-[0.75em] rounded-full bg-green-400" />
          <div className="ml-[0.25em] font-light text-[100%]">Fastbooks</div>
        </div>
        <div>
          <FastbookNavLink>Dashboard</FastbookNavLink>
          <FastbookNavLink>Accounts</FastbookNavLink>
          <FastbookNavLink active>Sales</FastbookNavLink>
          <FastbookNavLink>Expenses</FastbookNavLink>
          <FastbookNavLink>Reports</FastbookNavLink>
        </div>
      </div>
      <div className="flex-1">{children}</div>
      <div
        className={`
          absolute inset-0
          ${highlight ? "bg-orange-500 opacity-50" : ""}
        `}
      />
    </div>
  );
}

function FastbookNavLink({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`px-[0.5em] py-[0.25em] my-[0.5em] rounded-md font-medium text-[100%] ${
        active ? "bg-green-800 text-green-300" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function FastbooksSales({
  children,
  highlight,
}: {
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex justify-between px-[1.5em] py-[1em]">
        <SalesLink>Overview</SalesLink>
        <SalesLink>Subscriptions</SalesLink>
        <SalesLink active>Invoices</SalesLink>
        <SalesLink>Customers</SalesLink>
        <SalesLink>Deposits</SalesLink>
      </div>
      <div>{children}</div>
      <div
        className={`
          absolute inset-0
          ${highlight ? "bg-blue-500 opacity-50" : ""}
        `}
      />
    </div>
  );
}

function SalesLink({
  children,
  active,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`font-medium pr-[1em] last:pr-0 ${
        active ? "text-green-400" : ""
      }`}
    >
      {children}
    </div>
  );
}

export function FastbooksInvoices({
  children,
  highlight,
}: {
  highlight?: boolean;
  children: React.ReactNode;
}) {
  let invoices = [
    {
      name: "Santa Monica",
      number: 1995,
      amount: "$10,800",
      due: -1,
    },
    {
      name: "Stankonia",
      number: 2000,
      amount: "$8,000",
      due: 0,
      active: true,
    },
    {
      name: "Ocean Avenue",
      number: 2003,
      amount: "$9,500",
      due: 8,
    },
    {
      name: "Tubthumper",
      number: 1997,
      amount: "$14,000",
      due: 10,
    },
    {
      name: "Wide Open Sp...",
      number: 1998,
      amount: "$4,600",
      due: false,
    },
  ];
  return (
    <div className="relative h-full">
      <div className="pt-[1em] pb-[1.5em] px-[1.5em]">
        <div className="flex justify-between mb-[0.25em]">
          <div className="text-gray-300">Overdue: $10,800</div>
          <div className="text-gray-300">Due soon: $62,000</div>
        </div>
        <div className="flex">
          <div className="h-[1.5em] bg-yellow-200 w-1/3" />
          <div className="h-[1.5em] flex-grow ml-[0.25em] bg-gray-300" />
        </div>
      </div>
      <div className="flex border-t border-gray-500">
        <div className="border-r border-gray-500">
          {invoices.map((invoice) => (
            <div
              key={invoice.number}
              className={`flex justify-between text-[87.5%] p-[0.75em] m-[0.75em] ${
                invoice.active ? "bg-green-800 rounded-md" : ""
              }`}
            >
              <div>
                <div className="font-medium">{invoice.name}</div>
                <div className="text-gray-400">10{invoice.number}</div>
              </div>
              <div className="ml-[1em] text-right">
                <div className="font-medium">{invoice.amount}</div>
                {invoice.due === false ? (
                  <div>paid</div>
                ) : invoice.due === 0 ? (
                  <div className="text-green-400">due today</div>
                ) : invoice.due < 0 ? (
                  <div className="text-red-500">Overdue</div>
                ) : (
                  <div className="text-gray-400">due in {invoice.due} days</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <div
        className={`
          absolute inset-0
          ${highlight ? "bg-green-500 opacity-50" : ""}
        `}
      />
    </div>
  );
}

export function FastbooksInvoice({ highlight }: { highlight?: boolean }) {
  return (
    <div className="p-[1em] h-full overflow-hidden relative">
      <div className="max-w-xs mx-auto">
        <div className="flex w-full justify-between">
          <div>
            <div className="font-medium text-[125%]">Total Due</div>
            <div className="text-[200%] font-bold">$8,000</div>
          </div>
          <div>
            <div className="font-medium text-[85%]">Stankonia</div>
            <div className="text-gray-300">102000</div>
          </div>
        </div>
        <div className="flex w-full justify-between mt-[1.5em]">
          <div className="">
            <div className="text-[85%] font-medium">Invoice Date</div>
            <div className="text-gray-400">10/31/2000</div>
          </div>
          <div className="">
            <div className="text-[85%] font-medium">Due Date</div>
            <div className="text-gray-400">12/31/2000</div>
          </div>
        </div>
        <div className="mt-[3em]">
          <div className="text-[100%] font-medium">Activity</div>
          <div>
            <ActivityItem activity="Created" date="10/28/2000" />
            <ActivityItem activity="Sent" date="10/30/2000" />
          </div>
        </div>
      </div>
      <div
        className={`
          absolute inset-0
          ${highlight ? "bg-purple-500 opacity-50" : ""}
        `}
      />
    </div>
  );
}
function ActivityItem({ activity, date }: { activity: string; date: string }) {
  return (
    <div className="relative">
      <div className="h-[6em] border-l border-green-500 absolute top-[2em] left-[0.4em] sm:top-[1.5em] sm:left-[0.5em]" />
      <div className="mt-[1em] flex items-center">
        <div className="h-[1em] w-[1em] rounded-full bg-green-500" />
        <div className="ml-[1em]">
          <div className="font-medium">{activity}</div>
          <div className="text-gray-400">{date}</div>
        </div>
      </div>
    </div>
  );
}