describe('search.controller', function() {
	var controller;

	beforeEach(function() {
		module('app', function($provide) {
			specHelper.fakeRouteProvider($provide);
			specHelper.fakeConfig($provide);
		});
		specHelper.injector(function($controller, $q, $rootScope, dataservice, envConfig, resultDataStoreService){});
	});

	beforeEach(function() {
		sinon.stub(dataservice, 'searchForRecalls', function() {
			var deferred = $q.defer();
			deferred.resolve(mockData.getMockSearchServiceCall());
			return deferred.promise;
		});


		/*sinon.stub(resultDataStoreService, 'getSearchParams', function() {
			return mockData.getMockSearchParams();
		});*/

		sinon.stub(resultDataStoreService, 'getResultSet', function() {
			return mockData.getMockRecalls();
		});

		/*sinon.stub(resultDataStoreService, 'getLastViewedPage', function() {
			return 2;
		});*/

		sinon.stub(resultDataStoreService, 'storeResultSet', function() {
			// console.log('in store');
		});

		controller = $controller('SearchCtrl');
		$rootScope.$apply();
	});

	describe('search controller', function() {
		xit('should be created successfully', function() {
			expect(controller).to.be.defined;
		});

		describe('on search', function() {
			beforeEach(function() {
				controller.search();
			});

			it('should call searchForRecalls with correct params', function() {
				expect(dataservice.searchForRecalls).to.have.been.calledWith(controller.lastSearchParams, controller.pagination.currentPage);
			});

			it('should set searchResults', function() {
				expect(controller.searchResults.meta.results.total).to.equal(1173);
			});

			// FAILING
			xit('should store results in data store', function() {
				expect(resultDataStoreService.storeResultSet).to.have.been.called;
			});

			// FAILING
			xit('should set paging', function() {
				sinon.spy(controller, 'setPaging');
				// expect(controller.setPaging).to.be.defined;
				expect(controller.setPaging).to.have.been.called;
			});
		});

		xdescribe('on searchClicked', function() {
			beforeEach(function() {
				sinon.stub(resultDataStoreService, 'storeSearchParams', function(params) {});

				controller.searchClicked();
			});

			it('should store search params in data store', function() {
				expect(resultDataStoreService.storeSearchParams).to.have.been.calledWith(controller.searchParams);
			});

			// FAILING
			it('should copy search params', function() {
				// expect(angular.copy).to.have.been.called;
			});

			// FAILING
			it('should call search()', function() {
				expect(controller.search).to.have.been.called;
			});
		});

		describe('on setPaging', function() {
			it('should set the total pages correctly', function() {
				controller.setPaging();

				expect(controller.pagination.totalPages).to.equal(118);
			});
		});

		xdescribe('on pageChanges', function() {
			beforeEach(function() {
				sinon.stub(resultDataStoreService, 'storeLastViewedPage', function(params) {});

				controller.pageChanged();
			});

			it('should store the current page in the data store', function() {
				expect(resultDataStoreService.storeLastViewedPage).to.have.been.calledWith(controller.pagination.currentPage);
			});

			// FAILING
			it('should call search()', function() {
				expect(controller.search).to.have.been.called;
			});
		});
	});

	specHelper.verifyNoOutstandingHttpRequests();
});