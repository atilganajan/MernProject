import React from "react";

function LeftNav() {
  return (
    <div>
      <div>
        <div
          className="  mt-3 ps-4"
          style={{ fontSize: "16px", lineHeight: "24px", color: "#999" }}
        >
          Popüler Etiketler
        </div>
        <div className=" mt-1 ps-4 ">#example1</div>
        <div className="mt-1 ps-4">#example2</div>
      </div>

      <div className="mt-5">
        <div
          className="  mt-3 ps-4"
          style={{ fontSize: "16px", lineHeight: "24px", color: "#999" }}
        >
          Popüler Üyeler
        </div>
        <div className=" mt-1 ps-4 ">example1</div>
        <div className="mt-1 ps-4">example2</div>
        <div className=" mt-1 ps-4 ">example3</div>
        <div className="mt-1 ps-4">example4</div>
        <div className="mt-1 ps-4">example5</div>
      </div>

      <div className="mt-5">
        <div
          className="  mt-3 ps-4"
          style={{ fontSize: "16px", lineHeight: "24px", color: "#999" }}
        >
          Yeni Eklenen Markalar
        </div>
        <div className=" mt-1 ps-4 ">example1</div>
        <div className="mt-1 ps-4">example2</div>
        <div className="mt-1 ps-4">example3</div>
        <div className="mt-1 ps-4">example4</div>
        <div className="mt-1 ps-4">example5</div>
      </div>
    </div>
  );
}

export default LeftNav;
