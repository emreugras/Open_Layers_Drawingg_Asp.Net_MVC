using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Authentication;
using System.Data.Entity;
using System.Net;
using Denemeee.DataContext;
using Denemeee.Models;
using System.Web.Services.Description;
using Npgsql;
using System.Data.Entity.Spatial;
using System.Globalization;
using Antlr.Runtime;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Microsoft.Ajax.Utilities;
using NpgsqlTypes;
using System.Data.Entity.Migrations;
using System.Security.Cryptography.X509Certificates;

namespace Denemeee.Controllers
{
	[NoDirectAccess]

	public class HomeController : Controller
	{

		public LogModel logs = new LogModel();
		LoggerDbContext LoggerDb = new LoggerDbContext();
		public GeometryDbContext dbgeo = new GeometryDbContext();

		public ActionResult About()
		{
			ViewBag.Message = Session["u_name"];
			return View();
		}

		#region  Add Features to map
		public ActionResult AddGeometry(string wkbText, string Surname, string Name, string Comment)
		{
			try
			{
				if (Name != null && Surname != null && Comment != null)
				{
					Geometry obj = new Geometry();
					var datess = DateTime.Now.ToString();
					int ids = dbgeo.geoCol.OrderBy(x => x.id).Count();
					for (int i = 0; i <= ids; i++)
					{
						var idd = dbgeo.geoCol.Where(b => b.id == i).FirstOrDefault();
						if (idd == null)
						{
							obj.id = i;
							break;
						}
					}
					obj.Geom = wkbText;
					obj.Namew = Name;
					obj.Surnamew = Surname;
					obj.Datew = datess;
					obj.Comments = Comment;

					int idl = LoggerDb.Log.OrderBy(x => x.ides).Count();
					var dat = LoggerDb.Log.Where(x => x.ides == idl).FirstOrDefault();
					string s = dat.yeniKayıt;
					dat.yeniKayıt = s + obj.id + ",";
					LoggerDb.SaveChanges();

					if (ModelState.IsValid)
					{
						dbgeo.geoCol.Add(obj);
						dbgeo.SaveChanges();
					}
				}
				return Json(wkbText, JsonRequestBehavior.AllowGet);
			}
			catch (Exception exception)
			{
				return Json(new { Mesaj = "Hata:Kayıt Yapılamadı." + exception.Message }, JsonRequestBehavior.AllowGet);
			}
		}
		#endregion

		#region Get Features for map 
		public JsonResult GetData()
		{
			try
			{
				List<Geometry> geoList = dbgeo.geoCol.ToList();
				return Json(geoList, JsonRequestBehavior.AllowGet);
			}
			catch (Exception exception)
			{
				return Json(new { Mesaj = "Hata:Kayıt Getirilemedi." + exception.Message }, JsonRequestBehavior.AllowGet);
			}

		}

		#endregion

		#region Update Features
		public JsonResult UpdateFeatures(string Name, string Surname, string Comment, int Id)
		{
			try
			{
				var date = DateTime.Now.ToString();
				var data = dbgeo.geoCol.Where(b => b.id == Id).FirstOrDefault();
				data.Namew = Name;
				data.Surnamew = Surname;
				data.Comments = Comment;
				data.Datew = date;
				data.id = Id;
				dbgeo.SaveChanges();

				int idl = LoggerDb.Log.OrderBy(x => x.ides).Count();
				var dat = LoggerDb.Log.Where(x => x.ides == idl).FirstOrDefault();
				string s = dat.güncellenenKayıt;
				dat.güncellenenKayıt = s + Id + ",";
				LoggerDb.SaveChanges();

				return Json(JsonRequestBehavior.AllowGet);

			}
			catch (Exception exception)
			{
				return Json(new { Mesaj = "Hata:Güncelleme İşlemi Başarısız." + exception.Message }, JsonRequestBehavior.AllowGet);
			}

		}
		#endregion

		#region Delete Features
		public JsonResult DeleteFeatures(int idddd)
		{try
			{				var data = dbgeo.geoCol.Where(b => b.id == idddd).FirstOrDefault();
				if (data != null)
				{
					int idl = LoggerDb.Log.OrderBy(x => x.ides).Count();
					var dat = LoggerDb.Log.Where(x => x.ides == idl).FirstOrDefault();
					var s = dat.silinenKayıt;
					dat.silinenKayıt = s + idddd + ",";
					LoggerDb.SaveChanges();

					dbgeo.geoCol.Remove(data);
					dbgeo.SaveChanges();
				}
								return Json(JsonRequestBehavior.AllowGet);
			}
			catch (Exception exception)
			{
				return Json(new { Mesaj = "Hata:Silme İşlemi Başarısız." + exception.Message }, JsonRequestBehavior.AllowGet);
			}
		}
		#endregion

		public JsonResult GetLogs()
		{
			try
			{
				List<LogModel> logModels = LoggerDb.Log.OrderBy(x => x.ides).ToList();
				return Json(logModels, JsonRequestBehavior.AllowGet);
			}
			catch (Exception)
			{
				return Json(new { Mesaj = "Hata:Silme İşlemi Başarısız." }, JsonRequestBehavior.AllowGet);
			}
		}

		
	}


}